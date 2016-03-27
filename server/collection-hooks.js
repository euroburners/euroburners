Meteor.users.before.insert(function(userId, doc) {
  var profileTemplate = {
    firstName: null,
    lastName: null,
    handle: null,
    country: null,
    city: null
  }
  
  doc.username = doc.emails[0].address;
  doc.profile = profileTemplate;

  console.log(doc);
});