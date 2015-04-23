Meteor.publish("communities", function () {
  return Communities.find();
});

// Communities.allow({
//   insert: function(doc) {
//   },
//
//   update: function(userId, doc) {
//   }
// });