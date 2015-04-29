Template.communityResult.helpers({
  community: function() {
    return Events.findOne(this._id);
  },

  location: function() {
    return Locations.findOne(this.location);
  }
});