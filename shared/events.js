// initialize collection
Events = new Mongo.Collection('events');

Events.helpers({
  getLocation: function() {
    return Locations.findOne(this.location);
  },
  getContact: function() {
    return Meteor.users.findOne(this.contact);
  }, 
  isInPast: function() {
    return this.endDateTime < new Date();
  }
});

Events.textSearch = function(query) {
  var today = new Date();
  today.setHours(0, 0, 0);
  
  return this
    .find({startDateTime: {$gt: today}}, {sort: {startDateTime: 1}})
    .fetch()
    .filter(function(item) {
      var location = item.getLocation(); 
    
      return (location.name && location.name.contains(query))
          || (location.city && location.city.contains(query))
          || (location.country && location.country.contains(query));
    });
};

Events.before.remove(function(userId, doc) {
  Locations.remove(doc.location);
});
