Meteor.publish("persons", function () {
  return Persons.find();
});

// Persons.allow({
//   insert: function(doc) {
//   },
//
//   update: function(userId, doc) {
//   }
// });