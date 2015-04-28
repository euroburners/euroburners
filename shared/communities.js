// initialize collection
Communities = new Mongo.Collection('communities');

Communities.helpers({
  getLocation: function() {
    return Locations.findOne(this.location);
  },
  getContact: function() {
    return Persons.findOne(this.contact);
  }});

Communities.before.remove(function(userId, doc) {
  Locations.remove(doc.location);
});