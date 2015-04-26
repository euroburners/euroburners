// initialize collection
Communities = new Mongo.Collection('communities');

Communities.helpers({
  location: function() {
    return Locations.findOne(this.location);
  },
  contact: function() {
    return Persons.findOne(this.contact);
  }
});