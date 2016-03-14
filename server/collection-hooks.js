function setContactTypeRole(userId, doc) {
  if (doc && doc.profile && doc.profile.contactType) {
    Roles.setUserRoles(userId, doc.profile.contactType);
  }
}


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

Meteor.users.after.insert(setContactTypeRole);
Meteor.users.after.update(setContactTypeRole);