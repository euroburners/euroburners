Meteor.publish("locations", function () {
  return Locations.find();
});

Meteor.methods({
  reverseGeocode: function(doc) {
    var geocode = new GeoCoder();
    
    console.log(doc);
    
    return {
      originalDoc: doc, 
      geoResponse: geocode.reverse(doc.nextEvent.lat, doc.nextEvent.lng)[0]
    };
  }
});

// Locations.allow({
//   insert: function(doc) {
//   },
//
//   update: function(userId, doc) {
//   }
// });