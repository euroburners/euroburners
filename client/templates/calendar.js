// sort events by date
// Events
//   .find({}, {sort: {startDateTime: 1}})
//   .forEach(function(ev) { 
//     console.log(ev.name, ev.startDateTime); 
//   });

Template.calendar.rendered = function() {
  // initialize calendar view
  $('#calendar').fullCalendar({
    header: {
      left: '',
      center: 'title'
    },
    
    // populate events 
    events: function(start, end, timezone, callback) {
      console.log(start, end, timezone, callback);
      
      var events = Events.find().fetch().map(function(event) {
        return {
          title: event.name,
          start: event.startDateTime,
          end: event.endDateTime
        }
      });
      
      callback(events); 
    }
  });
};
