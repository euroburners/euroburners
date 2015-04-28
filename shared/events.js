// initialize collection
Events = new Mongo.Collection('events');

Events.helpers({
  getLocation: function() {
    return Locations.findOne(this.location);
  },
  getContact: function() {
    return Persons.findOne(this.contact);
  }
});

Events.before.remove(function(userId, doc) {
  Locations.remove(doc.location);
});