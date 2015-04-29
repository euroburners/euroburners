Template.navbar.events({
  'click .nav-item': function(event, template) {
    $('.nav-item').removeClass('selected');
    event.currentTarget.classList.add('selected');
  }, 
  
  'keyup #search': function(event, template) {
    var query = event.currentTarget.value;

    if (query.length > 1) {
      console.log(Events.textSearch(query));
      console.log(Communities.textSearch(query));
    }
  }
});