// TODO: fix this 
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
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'eventList'});
    setSelectedNavigationTab('#nav-events');
  }  
});
/* ***** route: view individual event ***** */ 
FlowRouter.route('/events/:id', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'eventView'});
    setSelectedNavigationTab('#nav-events');
  }  
});
/* ***** route: events editing ***** */ 
FlowRouter.route('/events/:id/edit', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'eventEdit'});
    setSelectedNavigationTab('#nav-events');
  }  
});
/* ***** route: events editing ***** */ 
FlowRouter.route('/events/new', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'eventNew'});
    setSelectedNavigationTab('#nav-events');
  }  
});


/* ***** route: communities ***** */ 
FlowRouter.route('/communities', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'communityList'});
    setSelectedNavigationTab('#nav-groups');
  }  
});
/* ***** route: view individual community ***** */ 
FlowRouter.route('/communities/:id', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'communityView'});
    setSelectedNavigationTab('#nav-groups');
  }  
});
/* ***** route: communities editing ***** */ 
FlowRouter.route('/communities/:id/edit', {
  action: function(params) {
    hideModal();
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'communityEdit'});
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

/* ***** route: profile (view/edit) ***** */ 
FlowRouter.route('/profile/:id', {
  action: function(params) {
    Session.set('profileId', params.id);
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'profileView'});
  }  
});
FlowRouter.route('/profile/:id/edit', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'profileEdit'});
  }  
});
/* if no ID is present in URI, redirect to home */
FlowRouter.route('/profile/', {
  action: function(params) {
    FlowRouter.go('/');
  }  
});

