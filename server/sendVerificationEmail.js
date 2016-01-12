Meteor.methods({
  // server method, called from Accounts.createUser in register.js
  sendVerificationEmail: function() {
    if (Meteor.userId()) {
      Accounts.sendVerificationEmail(Meteor.userId());
    }
  }
})