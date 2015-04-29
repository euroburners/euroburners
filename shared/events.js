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

Events.textSearch = function(query) {
  return this.find().fetch().filter(function(item) {
    var location = item.getLocation(); 
    
    return (location.name && location.name.contains(query))
        || (location.city && location.city.contains(query))
        || (location.country && location.country.contains(query));
  });
};

Events.before.remove(function(userId, doc) {
  Locations.remove(doc.location);
});
