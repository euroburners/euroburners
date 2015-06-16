var setSelectedNavigationTab = function(selector) {
  $('.nav-item.selected').removeClass('selected');
  $(selector).addClass('selected');
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
    $('#calendar').fullCalendar('render');
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

/* ***** route: events editing ***** */ 
FlowRouter.route('/events/:id/edit', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'editEvent'});
    setSelectedNavigationTab('#nav-events');
  }  
});

/* ***** route: communities ***** */ 
FlowRouter.route('/groups', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'communities'});
    setSelectedNavigationTab('#nav-groups');
  }  
});

/* ***** route: communities editing ***** */ 
FlowRouter.route('/groups/:id/edit', {
  action: function(params) {
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

