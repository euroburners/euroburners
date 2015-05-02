/* *************************************** 
  ***** packages to consider adding ***** 
  mrt:fullcalendar
  rzymek:fullcalendar || gquemart:meteor-reactive-fullcalendar
  u2622:persistent-session
  aramk:rrule
  dhtmlx:scheduler (http://dhtmlx.com/docs/products/dhtmlxScheduler/)
  
  ***** Martin Fowler on event recurrence *****
  http://martinfowler.com/apsupp/recurring.pdf
*************************************** */


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