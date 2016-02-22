Template.calendar.helpers({
  events: function() {
    return Events
              .find({}, {sort: {startDateTime: 1}})
              .fetch();
  }
});

/*
_id
endDateTime
location
name
startDateTime
submitterName
*/