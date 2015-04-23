Meteor.publish("events", function () {
  return Events.find();
});

// Events.allow({
//   insert: function(doc) {
//   },
//
//   update: function(userId, doc) {
//   }
// });