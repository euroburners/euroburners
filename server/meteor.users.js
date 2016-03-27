Meteor.methods({
  updateUser: function(userId, updateObj) {
    console.log(userId, updateObj);
    
    Meteor.users.update(userId, {$set: updateObj}, function(err) {
      if (err) {
        console.log('error', err);
      }
      else {
        if (updateObj['profile.contactType']) {
          // TODO: queue for approval rather than adding automatically
          //       - send email to approver, build admin approval UI 
          Roles.setUserRoles(userId, updateObj['profile.contactType'], Roles.GLOBAL_GROUP);
        }
      }
    });
  }
})