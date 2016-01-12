var requiredFieldsComplete = {}; 

Template.profile.rendered = function() {
  // This page should only be visible if we have a logged-in user
  // and are coming directly from /register 
  // TODO: figure out why referrer isn't working 
  if (-1 === window.location.href.indexOf(Meteor.userId())) {
  // if (!Meteor.user()) {
    FlowRouter.go('/');
  }
}

Template.profile.events({
  // 'blur [data-key]': function(evt, tmpl) {
  //   var elem = evt.currentTarget; 
  //   requiredFieldsComplete[elem.dataset.key] = !!elem.value;
  //   
  //   // if no false values are found
  //   if (!_.find(requiredFieldsComplete, function(item) {return !item;})) {
  //     $('button').attr('disabled', false)
  //   }
  // },
  
  'click button': function(evt, tmpl) { 
    var updateObj = {};

    _.forEach($('[data-key]'), function(elem) { 
      updateObj[elem.dataset.key] = elem.value;
    });
    
    Meteor.users.update(this._id, {$set: updateObj}, function(err) {
      if (err) {
        console.log('error', err);
      }
      else {
        // TODO: set a global message "Thank you for registering blahblah"
        FlowRouter.go('/');
      }
    });
  }
})