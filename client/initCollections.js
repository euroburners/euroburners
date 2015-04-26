// =================================================================
// collection initialization code
// =================================================================
var eventsHandle = Meteor.subscribe('events'),
    communitiesHandle = Meteor.subscribe('communities'),
    locationsHandle = Meteor.subscribe('locations'),
    
    initRun = false;

// no `var` so this is globally available 
InitializationErrors = {
  insertCommunity: [],
  insertCommunityLocation: [],
  insertEvent: [],
  insertEventLocation: [],
  geocode: [],
  reverseGeocode: []
};
    
Tracker.autorun(function() {
  if (eventsHandle.ready() && communitiesHandle.ready() && locationsHandle.ready()) {
    // =================================================================
    // if any of Locations, Events or Communities are empty, clear all and re-seed
    // =================================================================
    if (!initRun && (
        !Locations.find().count() 
        || !Events.find().count() 
        || !Communities.find().count()
      )) {
      console.log('// seeding events and communities');
      
      initRun = true;

      clearCollection(Locations);
      clearCollection(Events);
      clearCollection(Communities);
      
      seedEvents();
      seedCommunities();
    }
  }
});

function clearCollection(collection) {
  console.log('// Clearing collection %s (%d records)', collection._name, collection.find().count());
  
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
  $.getJSON('http://the.burn.directory/api/v1/burns.json')
    .then(function(response) {
      var burns = _.filter(response, function(burn) {
        return burn.region 
            && burn.nextEvent 
            && ('Europe' === burn.region.order_title || 'Europe' === burn.region.parent_title);
      });

      burns.forEach(function(burn, inx) {
        setTimeout(function() {
          var next = burn.nextEvent;

          if (next && next.lat && next.lng) {
            Meteor.call('reverseGeocode', next.lat, next.lng, function(err, resp) {
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
        }, inx * 500);    
      });
    });
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
      insertEvent(burn, resp);
    }
  });
}

function insertEvent(burn, locationId) {
  Events.insert({
    name: burn.name,
    startDateTime: burn.nextEvent.date,
    endDateTime: burn.nextEvent.end_date,
    location: locationId,
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

  locations.forEach(function(location, inx) { 
    setTimeout(function() {
      Meteor.call('geocode', location, function(err, resp) {
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
                name: geoResponse.city,
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
    }, inx * 500);
  });
}