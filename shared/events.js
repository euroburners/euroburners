// initialize collection
Events = new Mongo.Collection('events');

// "name"
// "description"
// "startDateTime"
// "endDateTime"
// "recurrencePattern"
// "recurrenceDuration"
// "location"
// "contact"
// "fbEvent"
// "eventUri"
// "ticketsOnSale"
// "ticketUri"
// "uris"

Events.helpers({
  getLocation: function() {
    return Locations.findOne(this.location);
  },
  getContact: function() {
    return Persons.findOne(this.contact);
  }
});