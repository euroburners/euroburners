// =================================================================
// collection initialization code
// =================================================================

var geo = new GeoCoder(),
    // geo = new GeoCoder({geocoderProvider: 'openstreetmap'}),
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
        }, 2000);
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

  burns.forEach(function(burn, inx, array) {
    var next = burn.nextEvent;

    if (next && next.lat && next.lng) {
      Meteor.setTimeout(function() {
        geo.reverse(next.lat, next.lng, function(err, resp) {
          if (err) {
            console.log('// Failure adding burn event: [%s]', burn.name);
            
            InitializationErrors.reverseGeocode.push({
              event: burn.name,
              error: err
            });
          }
          else {
            console.log('// Adding burn event: [%s]', burn.name);
            
            insertEvent(burn, resp[0]);
          }
        });

        seedEventsComplete = inx === array.length -1;
      }, inx * 500);
    }
  });
  
  seedEventsComplete = true;
}

function insertEvent(burn, geoResponse) {
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
  var regionals = [
    { email: 'austria@burningman.com', name: 'Austria', uri: 'http://regionals.burningman.org/regionals/europe/austria/' },
    { email: 'belgium@burningman.com', name: 'Belgium', description: 'Burners from Belgium', uri: 'http://regionals.burningman.org/regionals/europe/belgium/' },
    { email: 'czech@burningman.com', name: 'Czech Republic', uri: 'http://regionals.burningman.org/regionals/europe/czech-republic/' },
    { email: 'denmark@burningman.com', name: 'Denmark', uri: 'http://regionals.burningman.org/regionals/europe/denmark/' },
    { email: 'easterneurope@burningman.com', name: 'Eastern Europe', uri: 'http://regionals.burningman.org/regionals/europe/eastern-europe/' },
    { email: 'europe@burningman.com', name: 'Europe', uri: 'http://regionals.burningman.org/regionals/europe/europe/' },
    { email: 'finland@burningman.com', name: 'Finland', uri: 'http://regionals.burningman.org/regionals/europe/finland/' },
    { email: 'paris@burningman.com', name: 'France', uri: 'http://regionals.burningman.org/regionals/europe/paris/' },
    { email: 'germany@burningman.com', name: 'Germany', uri: 'http://regionals.burningman.org/regionals/europe/germany/' },
    { email: 'greece@burningman.com', name: 'Greece', uri: 'http://regionals.burningman.org/regionals/europe/greece/' },
    { email: 'ireland@burningman.com', name: 'Ireland', uri: 'http://regionals.burningman.org/regionals/europe/ireland/' },
    { email: 'italy@burningman.com', name: 'Italy', uri: 'http://regionals.burningman.org/regionals/europe/italy/' },
    { email: 'latvia@burningman.com', name: 'Latvia', uri: 'http://regionals.burningman.org/regionals/europe/latvia/' },
    { email: 'lithuania@burningman.com', name: 'Lithuania', uri: 'http://regionals.burningman.org/regionals/europe/lithuania/' },
    { email: 'israel@burningman.com', name: 'Israel', description: 'MIDBURN - Israel', uri: 'http://regionals.burningman.org/regionals/europe/israel/' },
    { email: 'netherlands@burningman.com', name: 'Netherlands', uri: 'http://regionals.burningman.org/regionals/europe/netherlands/' },
    { email: 'poland@burningman.com', name: 'Poland', uri: 'http://regionals.burningman.org/regionals/europe/poland/' },
    { email: 'russia@burningman.com', name: 'Moscow', description: 'Russian Burners', uri: 'http://regionals.burningman.org/regionals/europe/russia/' },
    { email: 'spain@burningman.com', name: 'Spain', uri: 'http://regionals.burningman.org/regionals/europe/spain/' },
    { email: 'barcelona@burningman.com', name: 'Barcelona', description: 'Barcelona Burning Man Community', uri: 'http://regionals.burningman.org/regionals/europe/spain-barcelona/' },
    { email: 'sweden@burningman.com', name: 'Sweden', uri: 'http://regionals.burningman.org/regionals/europe/sweden/' },
    { email: 'switzerland@burningman.com', name: 'Switzerland', uri: 'http://regionals.burningman.org/regionals/europe/switzerland/' },
    { email: 'uk@burningman.com', name: 'United Kingdom', uri: 'http://regionals.burningman.org/regionals/europe/uk/' },
    { email: 'bristol@burningman.com', name: 'Bristol, UK', description: 'United Kingdom-South West UK', uri: 'http://regionals.burningman.org/regionals/europe/united-kingdom-bristol/' }
  ];
  
  clearCollection(Communities);

  regionals.forEach(function(location, inx, array) { 
    Meteor.setTimeout(function() {
      console.log('// Adding community: [%s]', location.name);

      geo.geocode(location.name, function(err, resp) {
        var geoResponse = resp[0];
      
        if (err) {
          InitializationErrors.geocode.push({
            location: location,
            error: err
          });
        }
        else {
          Locations.insert({ 
            name: geoResponse.city || geoResponse.country, 
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
                name: geoResponse.city || geoResponse.country,
                description: location.description || location.name + ' burner community',
                location: res,
                contact: 'unknown',
                regionalContactEmail: location.email,
                regionalContactUri: location.uri
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
      
      seedCommunitiesComplete = inx === array.length -1;
    }, inx * 500);
  });
}
