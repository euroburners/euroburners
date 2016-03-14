'use strict';

/*
  TODO: check for token (email address?) on querystring
        - if present, render page
        - if not, show error message ("This page accessible only by invitation.")
*/

// TODO: consider moving profile assignment to server/onCreateUser.js
Template.register.events({
  'click #btnRegister': function(evt, tmpl) {
    var email = document.getElementById('txtEmail').value,
        password = document.getElementById('txtPassword').value;
        
    Accounts.createUser(
      { email: email, password: password },
      function fnCallback(err) {
        var errDiv = $('#errors');
        
        if (err) {
          errDiv.text('Error: ' + err.reason);
          errDiv.show();
        }
        else if (Meteor.userId()) {
          Meteor.call('sendVerificationEmail', function fnVerificationCallback(err, result) {
            if (err) {
              // TODO: handle error
            }
            else {
              FlowRouter.go('/profile/' + Meteor.userId() + '/edit');
            }
          });
        }
      }
    );
  }
});