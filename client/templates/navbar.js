Template.navbar.onRendered(function() {
  $('.dropdown').dropdown();
});

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
      $('#searchResults').show();
      Session.set('activeContainer', '#searchResults');
    }
    else {
      Session.set('searchResults', null);
      Session.set('activeContainer', null);
    }
  }, 
  
  'click #navicon': function(event, template) {
    $('#nav-menu').show();
  }
});