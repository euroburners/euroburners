Template.eventDetail.helpers({
  selectedEvent: function() {
    var selectedEventId = Session.get('selectedEventId');     
    return Events.findOne(selectedEventId);
  }
});