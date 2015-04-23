// initialize collection
Communities = new Meteor.Collection('communities');

Communities.helpers({
  location: function() {
    return Locations.findOne(this.location);
  },
  contact: function() {
    return Persons.findOne(this.contact);
  }
});