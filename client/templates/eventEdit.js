var selectedEvent = null;

Template.eventEdit.helpers({
  selectedEvent: function() {
    selectedEvent = Events.findOne(Session.get('selectedEventId')); 
    return selectedEvent;
  }
});

Template.eventEdit.events({
});