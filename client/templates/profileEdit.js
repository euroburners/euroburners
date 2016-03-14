var requiredFieldsComplete = {}; 

Template.profileEdit.onRendered(function() {
  var user = Meteor.user(), 
      userProfile = user.profile;

  if (!user) {
    FlowRouter.go('/');
  }

  if (userProfile.country) {
    $('option[value="' + user.profile.country + '"]').attr('selected', true);
  }
  if (userProfile.contactType) {
    $('input[value="' + user.profile.contactType + '"]').attr('checked', true);
  }
});

Template.profileEdit.events({
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