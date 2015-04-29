// SimpleSchema documentation: https://github.com/aldeed/meteor-simple-schema

// use this to add schema options
// SimpleSchema.extendOptions({
//   restricted: Match.Optional(Boolean)
// });

Schemas = {};

// ============================================
// Person
// ============================================
Schemas.Person = new SimpleSchema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  playaName: {
    type: String
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  fbUserId: {
    type: String
  }
});

// ============================================
// LabeledUri
// ============================================
Schemas.LabeledUri = new SimpleSchema({
  label: {
    type: String
  },
  uri: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  }
});

// ============================================
// Location
// ============================================
// - requires either a name or lat/lng coordinates (may contain both)
// - will require validation that appropriate location data is present 
// - https://github.com/aldeed/meteor-simple-schema#make-a-field-conditionally-required
// ============================================
Schemas.Location = new SimpleSchema({
  name: {
    type: String
  },
  lat: {
    type: Number,
    decimal: true,
    min: -90,
    max: 90
  },
  lng: {
    type: Number,
    decimal: true,
    min: -180,
    max: 180
  }, 
  city: {
    type: String,
    optional: true
  },
  country: {
    type: String 
  }
});


// ============================================
// Community 
// ============================================
Schemas.Community = new SimpleSchema({
  name: {
    type: String,
    max: 100
  },
  description: {
    type: String,
    max: 1000
  },
  location: {
    type: String // id corresponding to Location collection
    // TODO: custom validation that Locations.find(_id) exists
  }, 
  contact: {
    type: String // id corresponding to Person collection
    // TODO: custom validation that Persons.find(_id) exists
  },
  fbPage: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  regionalContactEmail: {
    type: String,
    optional: true
  },
  regionalContactUri: {
    type: String,
    optional: true
  },
  twitter: {
    type: String,
    optional: true
  },
  uris: {
    type: [String], // array of id values corresponding to LabeledUri collection 
    optional: true
  }
});


// ============================================
// Event
// ============================================
// - Simple recurrence implementation, at least initially: 
//   - allowed values: 1 (weekly), 2 (monthly)
//   - if monthly, by day of week only (for example: 3rd Thursday of each month)
//   - recurrence only allowed to extend for 1 year max (52 weekly events / 12 monthly events)
// ============================================
// TODO: add burn type selection : String/required/allowedValues (determine allowed values)
// TODO: add submitterEmail : String/optional (required if not logged in)
// TODO: add approved : String/optional (required if not logged in)
// ============================================
Schemas.Event = new SimpleSchema({
  name: {
    type: String,
    max: 100
  },
  description: {
    type: String,
    optional: true,
    max: 1000
  },
  startDateTime: {
    type: Date
  },
  endDateTime: {
    type: Date
  },
  recurrencePattern: {
    type: Number,
    optional: true,
    allowedValues: [1,2] // allowed values: 1 (weekly), 2 (monthly)
  },
  // TODO: figure out how to handle monthly recurrence (such as "3rd Thursday")
  recurrenceDuration: {
    type: Number,
    optional: true,
    custom: function() {
      var recurPattern = this.field('recurrencePattern').value,
          recurDuration = this.value,
          isValid = (1 === recurPattern && 52 >= recurDuration) 
                 || (2 === recurPattern && 12 >= recurDuration),
          retval = true;
      
      if (!!recurPattern && !isValid) {
        retval = 'recurrenceDurationError';
      }
      
      return retval;
    }
  },
  location: {
    type: String // id corresponding to Location collection
    // TODO: custom validation that Locations.find(_id) exists
  }, 
  contact: {
    type: String, // id corresponding to Person collection
    optional: true // if submitted by non-registered person
    // TODO: custom validation that Persons.find(_id) exists (unless submitterEmail/submitterName)
  },
  submitterName: {
    type: String,
    optional: function() {
      return Meteor.user && !Meteor.userId();
    }
  },
  fbEvent: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  eventUri: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  ticketsOnSale: {
    type: Boolean, 
    optional: true
  }, 
  ticketUri: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  uris: {
    type: [String], // array of id values corresponding to LabeledUri collection 
    optional: true
  }
});

Schemas.Event.messages({
  'recurrenceDurationError': 'Events may only be set to repeat for one year (52 weeks, 12 months).'
});


// attach schemas to collections 
LabeledUris.attachSchema(Schemas.LabeledUri);
Locations.attachSchema(Schemas.Location);
Persons.attachSchema(Schemas.Person);
Events.attachSchema(Schemas.Event);
Communities.attachSchema(Schemas.Community);