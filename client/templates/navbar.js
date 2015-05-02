Template.navbar.events({
  'click .nav-item': function(event, template) {
    $('.nav-item').removeClass('selected');
    event.currentTarget.classList.add('selected');
  }, 
  
  'keyup #search input': function(event, template) {
    var query = event.currentTarget.value;

    if (query.length > 1) {
      Session.set('searchResults', {
        query: query,
        communities: Communities.textSearch(query),
        events: Events.textSearch(query)
      });
      
      $('#searchResults').show(500);
      Session.set('activeContainer', '#searchResults');
    }
    else {
      Session.set('searchResults', null);
      Session.set('activeContainer', null);
    }
  }, 
  
  'click #navicon': function(event, template) {
    $('#nav-menu').css('display', 'block');
  },
  
  'click #nav-cal-map': function(event, template) {
    var target = event.currentTarget, 
        newActivePanelSelector = '#' + target.innerText.toLowerCase();
    
    target.innerText = ('#map' === newActivePanelSelector) ? 'Calendar' : 'Map';
    
    $('.active-panel').removeClass('active-panel');
    $(newActivePanelSelector).addClass('active-panel');
  }
});