// =================================================================
// collection initialization code
// =================================================================

var geo = new GeoCoder({geocoderProvider: 'openstreetmap'}),
    seedEventsComplete = false, 
    seedCommunitiesComplete = false;

// no `var` so this is globally available (for console etc)
InitializationErrors = {
  insertCommunity: [],
  insertCommunityLocation: [],
  insertEvent: [],
  insertEventLocation: [],
  geocode: [],
  reverseGeocode: []
};
    

Meteor.startup(function() {
  var initDone = AppSettings.findOne({key: 'initDone'}),
      interval;

  if (!initDone || !initDone.value) {
    interval = Meteor.setInterval(function() {
      if (seedEventsComplete && seedCommunitiesComplete) {
        Meteor.clearInterval(interval);
        AppSettings.insert({key: 'initDone', value: true});
        
        console.log('// ********************************** //');
        logInitializationErrors();
        console.log('// ********************************** //');

        Meteor.setTimeout(function() {
          logCollection(Events, Communities, Locations);
          console.log('// ********************************** //');        
        }, 1000);
      }
    }, 500);
    
    seedEvents();
    seedCommunities();
  }
});


function logInitializationErrors() {
  Object.keys(InitializationErrors).forEach(function(key) {
    console.log('// InitializationErrors.%s', key, InitializationErrors[key]);
  });
}

function logCollection() {
  _.each(arguments, function(collection) {
    console.log('// Collection %s updated: (%d records)', collection._name, collection.find().count());
  });
}

function clearCollection(collection) {
  console.log('// ********************************** //');
  console.log('// Clearing collection %s (%d records)', collection._name, collection.find().count());
  console.log('// ********************************** //');
  
  collection.find().forEach(function(item) {
    collection.remove(item._id);
  });  
}

// =================================================================
// populate events from Mephy's data
// filter to only burns in Europe
// insert location and event for each European burn
// =================================================================
function seedEvents() {
  var eventJson, burns;
  
  clearCollection(Events);

  eventJson = HTTP.get('http://the.burn.directory/api/v1/burns.json');

  burns = _.filter(eventJson.data, function(burn) {
    return burn.region 
        && burn.nextEvent 
        && ('Europe' === burn.region.order_title || 'Europe' === burn.region.parent_title);
  });
  
  console.log('// ********************************** //');
  console.log('// Found %d European burns at the.burn.directory.', burns.length);
  console.log('// ********************************** //');  

  burns.forEach(function(burn, inx) {
    console.log('// Adding burn event: [%s]', burn.name);
    
    var next = burn.nextEvent;

    if (next && next.lat && next.lng) {
      geo.reverse(next.lat, next.lng, function(err, resp) {
        if (err) {
          InitializationErrors.reverseGeocode.push({
            event: burn.name,
            error: err
          });
        }
        else {
          insertEventLocation(burn, resp[0]);
        }
      });
    }
  });
  
  seedEventsComplete = true;
}

function insertEventLocation(burn, geoResponse) {
  Locations.insert({
    name: burn.name, 
    lat: burn.nextEvent.lat, 
    lng: burn.nextEvent.lng,
    city: geoResponse.city,
    country: geoResponse.country
  }, 
  
  function(err, resp) {
    if (err) { 
      InitializationErrors.insertEventLocation.push({
        event: burn.name,
        error: err
      });
    }
    else {
      Events.insert({
        name: burn.name,
        startDateTime: burn.nextEvent.date,
        endDateTime: burn.nextEvent.end_date,
        location: resp,
        submitterName: 'the.burn.directory'
      }, 
      function(err, resp) {
        if (err) { 
          InitializationErrors.insertEvent.push({
            event: burn.name,
            error: err
          });
        }            
      });
    }
  });
}

// =================================================================
// Populate communities from list of known cities
// =================================================================
function seedCommunities() {
  var locations = [
    'Amsterdam, NL',
    'Berlin, DE',
    'Barcelona, ES',
    'London, GB',
    'Bristol, GB',
    'Brussels, BE',
    'Paris, FR',
    'Milan, IT',
    'Munich, DE',
    'Vienna, AT',
    'Prague, CZ',
    'Moscow, RU',
    'Israel',
    'Latvia',
    'Lithuania',
    'Estonia',
    'Finland'
  ];
  
  
  clearCollection(Communities);

  locations.forEach(function(location, inx) { 
    console.log('// Adding community: [%s]', location);
    
    geo.geocode(location, function(err, resp) {
      var geoResponse = resp[0];
      
      if (err) {
        InitializationErrors.geocode.push({
          location: location,
          error: err
        });
      }
      else {
        Locations.insert({ 
          name: geoResponse.city || '-', 
          lat: geoResponse.latitude, 
          lng: geoResponse.longitude,
          city: geoResponse.city,
          country: geoResponse.country
        },     
        function(err,res) {
          if (err) { 
            InitializationErrors.insertCommunityLocation.push({
              location: location,
              error: err
            });
          }
          else {
            Communities.insert({
              name: geoResponse.city || '-',
              description: location + ' burner community',
              location: res,
              contact: 'unknown'
            }, 
            function(err, res) {
              if (err) { 
                InitializationErrors.insertCommunity.push({
                  location: location,
                  error: err
                });
              }            
            });
          }
        });        
      }
    });    
  });

  seedCommunitiesComplete = true;
}

