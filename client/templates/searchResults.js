var hideTimeout = null;

Template.searchResults.helpers({
  searchResults: function() {
    return Session.get('searchResults');
  }
});

Template.searchResults.events({
  'mouseleave #searchResults': function(event, template) {
    hideTimeout = Meteor.setTimeout(function() {
      if (hideTimeout) {
        $('#searchResults').hide(500);
      }
    }, 750);
  }, 
  
  'mouseenter #searchResults': function(event, template) {
    Meteor.clearTimeout(hideTimeout);
    hideTimeout = null;
  }  , 

  'mouseenter .result': function(event, template) {
    // mapMarkers[this.location]  
  }, 

  'mouseleave .result': function(event, template) {
    // mapMarkers[this.location]
  }
});

