// Template.profileView.onRendered(function() {});

Template.profileView.helpers({
  user: function() {
    var profileId = Session.get('profileId');
    
    if (profileId) {
      return Meteor.users.findOne(profileId);
    }
  },
  userIsCurrentUser: function() {
    return Session.equals('profileId', Meteor.userId());
  }
});
// Template.profileView.events({});