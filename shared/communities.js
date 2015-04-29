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

Communities.textSearch = function(query) {
  return this.find().fetch().filter(function(item) {
    var location = item.getLocation(); 
    
    return (item.name && item.name.contains(query))
        || (item.description && item.description.contains(query))
        || (location.name && location.name.contains(query))
        || (location.city && location.city.contains(query))
        || (location.country && location.country.contains(query));
  });
};
