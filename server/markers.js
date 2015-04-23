Meteor.publish("markers", function () {
  return Markers.find();
});

// Markers.allow({
//   insert: function(doc) {
//   },
//
//   update: function(userId, doc) {
//   }
// });