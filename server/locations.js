Meteor.publish("locations", function () {
  return Locations.find();
});

Meteor.methods({
  reverseGeocode: function(doc) {
    var geo = new GeoCoder();
    // var geo = new GeoCoder({geocoderProvider: "openstreetmap"});
    
    return {
      originalDoc: doc, 
      geoResponse: geo.reverse(doc.nextEvent.lat, doc.nextEvent.lng)[0]
    };
  },
  
  geocode: function(location) {
    var geo = new GeoCoder();
    // var geo = new GeoCoder({geocoderProvider: "openstreetmap"});
    return geo.geocode(location);
  }
});

// Locations.allow({
//   insert: function(doc) {
//   },
//
//   update: function(userId, doc) {
//   }
// });