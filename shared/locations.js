// initialize collection
Locations = new Mongo.Collection('locations');

Locations.helpers({
  regionals: function() {
    var regionals = [];
    
    this.regionalContacts.forEach(function(contactId) {
      regionals.push(Meteor.users.find(contactId));
    });
    
    return regionals;
  },
  getLocation: function() {
    return Locations.findOne(this.location);
  },
  getContact: function() {
    return Meteor.users.findOne(this.contact);
  }
});