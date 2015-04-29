Template.eventResult.helpers({
  event: function() {
    return Events.findOne(this._id);
  },

  location: function() {
    return Locations.findOne(this.location);
  }
});