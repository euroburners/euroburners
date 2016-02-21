Template.searchResults.rendered = function() {
  if (this.firstNode) {
    this.firstNode.style.top = $('#brandbar').css('height');
  }
};

Template.searchResults.helpers({
  searchResults: function() {
    return Session.get('searchResults');
  }
});

Template.searchResults.events({
  'mouseenter .result': function(event, template) {
    var marker = mapMarkers[this.location];

    if (marker) {
      marker.options.toggleHoverColor();
    }
  }, 

  'mouseleave .result': function(event, template) {
    var marker = mapMarkers[this.location];

    if (marker) {
      marker.options.toggleHoverColor();
    }
  },
  
  'click .result': function(event, template) {
    console.log('click .result', this, event, template);
  }
});

