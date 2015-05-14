/* ***** route: home ***** */ 
FlowRouter.route('/', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'map'});
  }  
});

/* ***** route: calendar ***** */ 
FlowRouter.route('/calendar', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'calendar'});
    $('#calendar').fullCalendar('render');
  }  
});

/* ***** route: map ***** */ 
FlowRouter.route('/map', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'map'});
  }  
});

/* ***** route: events ***** */ 
FlowRouter.route('/events', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'events'});
  }  
});

/* ***** route: communities ***** */ 
FlowRouter.route('/communities', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'communities'});
  }  
});

/* ***** route: resources ***** */ 
FlowRouter.route('/resources', {
  action: function(params) {
    FlowLayout.render('layout-main', {nav: 'navbar', main: 'resources'});
  }  
});

