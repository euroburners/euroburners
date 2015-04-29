// subscribe to published collections (to track changes)
Meteor.subscribe('events');
Meteor.subscribe('persons');
Meteor.subscribe('markers');
Meteor.subscribe('communities');
Meteor.subscribe('locations');
Meteor.subscribe('labeledUris');

Meteor.startup(function() {
  Session.set('searchResults', null);
});

Template.registerHelper('formatDate', function(date, formatString) {
  return Intl.DateTimeFormat('en-GB').format(date);
});