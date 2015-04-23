Meteor.publish("labeledUris", function () {
  return LabeledUris.find();
});

// LabeledUris.allow({
//   insert: function(doc) {
//   },
//
//   update: function(userId, doc) {
//   }
// });