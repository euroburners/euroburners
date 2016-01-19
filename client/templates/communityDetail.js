var selectedCommunity = null;

Template.communityDetail.helpers({
  selectedCommunity: function() {
    selectedCommunity = Communities.findOne(Session.get('selectedCommunityId'));
    return selectedCommunity;
  },
  
  canEdit: function() {
    // TODO: implement security for editing (role-based?)
    return true;
  }
});

Template.communityDetail.events({
  'click .communityEditLink': function(community, template) {
    $(template.firstNode).modal('hide');

    FlowRouter.go('/communities/' + selectedCommunity._id + '/edit');
  },
  
  'click #closeCommunityDetail': function(community, template) {
    $(template.firstNode).modal('hide');
  }
});