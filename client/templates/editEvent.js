var selectedEvent = null;

Template.editEvent.helpers({
  selectedEvent: function() {
    selectedEvent = Events.findOne(Session.get('selectedEventId')); 
    return selectedEvent;
  }
});

Template.editEvent.events({
});