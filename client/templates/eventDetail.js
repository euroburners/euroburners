var selectedEvent = null;

Template.eventDetail.helpers({
  selectedEvent: function() {
    selectedEvent = Events.findOne(Session.get('selectedEventId'));
    return selectedEvent;
  },
  
  canEdit: function() {
    // TODO: implement security for editing (role-based?)
    return false;
  }
});

Template.eventDetail.events({
  'click .eventEditLink': function(event, template) {
    $(template.firstNode).modal('hide');

    FlowRouter.go('/events/' + selectedEvent._id + '/edit');
  }
});