Meteor.publish("locations", function () {
  return Locations.find();
});

Meteor.methods({
  reverseGeocode: function(lat, lng) {
    var geo = new GeoCoder();
    // var geo = new GeoCoder({geocoderProvider: "openstreetmap"});
    
    return geo.reverse(lat, lng);
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