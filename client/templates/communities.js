var _communities; 

var getCommunities = function() {
  _communities = _.map(Communities.find().fetch(), function(community) {
      var location = _.clone(community.getLocation());

      if (location._id) {
        delete location._id;
      }

      console.log(_.extend(community, location));
      return _.extend(community, location);
    });
}

Template.communities.helpers({
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
  }
});

Template.communities.events({
});