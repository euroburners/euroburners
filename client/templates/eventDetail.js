var selectedEvent = null;

Template.eventDetail.helpers({
  selectedEvent: function() {
    selectedEvent = Session.get('selectedEvent');     
    return selectedEvent;
  },
  
  canEdit: function() {
    // TODO: implement security for editing (role-based?)
    return true;
  }
});

Template.eventDetail.events({
  'click .eventEditLink': function(event, template) {
    $('#eventDetail').removeClass('active-result');
    $('#eventDetail').hide();
    
    FlowRouter.go('/events/' + selectedEvent._id + '/edit');
  }
});