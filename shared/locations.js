// initialize collection
Locations = new Meteor.Collection('locations');

Locations.helpers({
  regionals: function() {
    var regionals = [];
    
    this.regionalContacts.forEach(function(contactId) {
      regionals.push(Persons.find(contactId));
    });
    
    return regionals;
  }
})