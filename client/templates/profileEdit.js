// TODO: determine a better, less hacky way to do this
//       - preferably without having to put a helper on every option / input
Template.profileEdit.helpers({
  setCountryAndContactType: function() {
    Meteor.setTimeout(function() {
      if (Meteor.user()) {
        var user = Meteor.user(); 
        userProfile = user && user.profile;
  
        $('option[value="' + userProfile.country + '"]').attr('selected', true);
        $('input[value="' + userProfile.contactType + '"]').attr('checked', true);
      }
    }, 500);
  }
});

Template.profileEdit.events({
  'click button': function(evt, tmpl) { 
    var updateObj = {}, 
        elems = $('[data-key]').not('[name=contactType]')
                  .add($('[name=contactType]:checked'));
    
    _.forEach(elems, function(elem) { 
      updateObj[elem.dataset.key] = elem.value;
    });
    
    Meteor.call('updateUser', this._id, updateObj, function(err, res) {
      if (err) {
        console.log('error', err);
      }
      else {
        // TODO: set a global message "Thank you for registering blahblah"
        FlowRouter.go('/');
      }      
    }); 
  }
});