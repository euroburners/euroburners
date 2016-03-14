// Template.profileView.onRendered(function() {});

Template.profileView.helpers({
  user: function() {
    var profileId = Session.get('profileId');
    
    if (profileId) {
      return Meteor.users.findOne(profileId);
    }
  }
});
// Template.profileView.events({});