// sort events by date
// Events
//   .find({}, {sort: {startDateTime: 1}})
//   .forEach(function(ev) { 
//     console.log(ev.name, ev.startDateTime); 
//   });

Tracker.autorun(function() {
  
});

Template.calendar.rendered = function() {
  // initialize calendar view
  $('#calendar').fullCalendar({
    height: screen.availHeight - 30,
    
    header: {
      left: '',
      center: 'title'
    },
    
    // populate events 
    events: function(start, end, timezone, callback) {
      var events = Events.find().fetch().map(function(event) {
        var options = {
          id: event._id,
          title: event.name,
          start: event.startDateTime,
          end: event.endDateTime
        };
        
        // TODO: icon for event type (weekend, regional, decompression, regular)
        //       - assemble all classes as array, then assign to .className with [].join(' ');
        if (event.isInPast()) {
          options.className = 'past';
        }
        
        return options;
      });
      
      callback(events); 
    },
    
    eventClick: function(event) {
      Session.set('selectedEventId',  event.id);
      $('#eventDetail').addClass('active-result');
      $('#eventDetail').show();
    }
  });
};
