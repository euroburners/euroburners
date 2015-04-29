Template.navbar.events({
  'click .nav-item': function(event, template) {
    $('.nav-item').removeClass('selected');
    event.currentTarget.classList.add('selected');
  }, 
  
  'keyup #search': function(event, template) {
    var query = event.currentTarget.value;

    if (query.length > 1) {
      Session.set('searchResults', {
        query: query,
        communities: Communities.textSearch(query),
        events: Events.textSearch(query)
      });
      
      $('#searchResults').show(500);
    }
    else {
      Session.set('searchResults', null);
    }
  }
});