var _communities; 

var getCommunities = function() {
  _communities = _.map(Communities.find().fetch(), function(community) {
      var location = _.clone(community.getLocation());

      if (location && location._id) {
        delete location._id;
      }

      return _.extend(community, location);
    });
}

Template.communityList.helpers({
  communities: function(country) { 
    if (!_communities) {
      getCommunities();
    }; 
    
    return (!!country) 
      ? _.where(_communities, {country: country}) 
      : communities;
  },
  
  countries: function() {
    if (!_communities) {
      getCommunities();
    }; 
    
    return _.uniq(_.pluck(_communities, 'country'));
  },
  
  checkContactExists: function() {
    if ('unknown' === this.contact) {
      return 'noContact';
    }
  },

  canEdit: function() {
    // TODO: implement security for editing (role-based?)
    return true;
  }
});

Template.communityList.events({
  'click div.commmunityEdit': function(event, template) {
    // console.log('click div.commmunityEdit', this, event, template);
    FlowRouter.go('/communities/' + this._id + '/edit');
  },

  'click div.addContact': function(event, template) {
    console.log('click div.addContact', this, event, template);
  }
});