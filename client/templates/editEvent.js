var selectedEvent = null;

Template.editEvent.helpers({
  selectedEvent: function() {
    selectedEvent = Session.get('selectedEvent');     
    console.log(selectedEvent);
    return selectedEvent;
  }
});

Template.editEvent.events({
});