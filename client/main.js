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

Template.registerHelper('formatDate', function(date) {
  return Intl.DateTimeFormat('en-GB').format(date);
});

Template.registerHelper('formatDateShort', function(date) {
  var options = {
    month: 'short',
    day: 'numeric'
  };
  
  return Intl.DateTimeFormat('en-GB', options).format(date);
});

Template.registerHelper('formattedDates', function(start, end) {
  var startDate = new moment(start), 
      endDate = new moment(end),
      dateString, 
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // different years (ex: New Year's Eve event)
  if (startDate.year() != endDate.year()) {
    dateString = startDate.date() + ' ' + months[startDate.month()] + ', ' + startDate.year() + ' - ' + endDate.date() + ' ' + months[endDate.month()] + ', ' + endDate.year();
  }
  // same date (ex: regular gathering, decom)
  else if (startDate.date() === endDate.date() && startDate.month() === endDate.month()) {
    dateString = startDate.date() + ' ' + months[startDate.month()] + ', ' + startDate.year();
  }
  // same month (ex: weekend, regional)
  else if (startDate.month() === endDate.month()) {
    dateString = startDate.date() + '-' + endDate.date() + ' ' + months[startDate.month()] + ', ' + startDate.year();
  }
  // different months (ex: weekend / regional that spans a month boundary)
  else {
    dateString = startDate.date() + ' ' + months[startDate.month()] + ' - ' + endDate.date() + ' ' + months[endDate.month()] + ', ' + startDate.year();
  }
  
  return dateString;
});
