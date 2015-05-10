Template.eventDetail.helpers({
  selectedEvent: function() {
    var selectedEventId = Session.get('selectedEventId'),
        event = Events.findOne(selectedEventId);
        
    console.log(event);
    return event;
  }, 
  
  isInPast: function(end) {
    return end < new Date();
  }
});