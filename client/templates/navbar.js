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
      
      $('#searchResults').addClass('active-result');
      $('#searchResults').show(500);
      Session.set('activeContainer', '#searchResults');
    }
    else {
      Session.set('searchResults', null);
      Session.set('activeContainer', null);
    }
  }, 
  
  'click #navicon': function(event, template) {
    $('#nav-menu').show();
  },
  
  'click #nav-cal-map': function(event, template) {
    var target = event.currentTarget, 
        targetText = target.innerText,
        newActivePanelSelector = '#' + targetText.toLowerCase();
    
    target.innerText = ('Map' === targetText) ? 'Calendar' : 'Map';
    
    $('.active-panel').removeClass('active-panel');
    $('.active-result').hide();
    $('#nav-menu').hide();
    $(newActivePanelSelector).addClass('active-panel');
    
    if ('Calendar' === targetText) {
      $('#calendarContainer').fullCalendar('render');
    }
  }
});