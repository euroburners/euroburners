function setSelectedNavigationTab(selector) {
  $('.nav-item.selected').removeClass('selected');
  $(selector).addClass('selected');
}

function hideModal() {
  var modalSelector = Session.get('activeModal');

  if (modalSelector) {
    $(modalSelector).modal('hide');
    Session.set('activeModal', null);      
  }
}


/* ***** route: home / map ***** */ 
FlowRouter.route('/', {
  action: function(params) {
    FlowLayout.render('layout-map', {map: 'map', nav: 'navbar'});
    setSelectedNavigationTab('#nav-map');
  }  
});


/* ***** route: calendar ***** */ 
FlowRouter.route('/calendar', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'calendar'});
    // $('#calendar').fullCalendar('render');
    setSelectedNavigationTab('#nav-calendar');
  }  
});


/* ***** route: map ***** */ 
FlowRouter.route('/map', {
  action: function(params) {
    FlowRouter.redirect('/');
  }  
});


/* ***** route: events ***** */ 
FlowRouter.route('/events', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'events'});
    setSelectedNavigationTab('#nav-events');
  }  
});
/* ***** route: view individual event ***** */ 
FlowRouter.route('/events/:id', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'viewEvent'});
    setSelectedNavigationTab('#nav-events');
  }  
});
/* ***** route: events editing ***** */ 
FlowRouter.route('/events/:id/edit', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'editEvent'});
    setSelectedNavigationTab('#nav-events');
  }  
});


/* ***** route: communities ***** */ 
FlowRouter.route('/communities', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'communities'});
    setSelectedNavigationTab('#nav-groups');
  }  
});
/* ***** route: view individual community ***** */ 
FlowRouter.route('/communities/:id', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'viewCommunity'});
    setSelectedNavigationTab('#nav-groups');
  }  
});
/* ***** route: communities editing ***** */ 
FlowRouter.route('/communities/:id/edit', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'editCommunity'});
    setSelectedNavigationTab('#nav-groups');
  }  
});


/* ***** route: resources ***** */ 
FlowRouter.route('/resources', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'resources'});
    setSelectedNavigationTab('#nav-resources');
  }  
});


/* ***** route: register ***** */ 
FlowRouter.route('/register', {
  action: function(params) {
    FlowLayout.render('register');
  }  
});

/* ***** route: profile ***** */ 
FlowRouter.route('/profile/:id', {
  action: function(params) {
    FlowLayout.render('profile');
  }  
});

/* if no ID is present in URI, redirect to home */
FlowRouter.route('/profile/', {
  action: function(params) {
    FlowRouter.go('/');
  }  
});

