// REF: Leaflet documentation: http://leafletjs.com/reference.html

mapMarkers = {};

Template.map.events({
  'click': function() {
    var activeContainer = Session.get('activeContainer');
    
    if (activeContainer) {
      $(activeContainer).hide(500);
    }
    
    $('#search').val('');
  }
});

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  var map = L.map('map', {
    minZoom: 4,
    zoomControl: false,
    attributionControl: false
  });
  
  // REF: FontAwesome icons list: http://fortawesome.github.io/Font-Awesome/icons/
  var eventMarker = L.AwesomeMarkers.icon({
    prefix: 'fa',
    icon: 'bolt',
    markerColor: 'green'
  });
  
  var communityMarker = L.AwesomeMarkers.icon({
    prefix: 'fa',
    icon: 'users',
    markerColor: 'purple'
  });
  
  map.setView([49, 9], 5);
  
  // we can use this to zoom to current location (use on mobile devices?)
  // map.locate({setView: true, maxZoom: 11});

  // set tile provider (REF: http://leaflet-extras.github.io/leaflet-providers/preview/)
  L.tileLayer.provider('Acetate.all').addTo(map);

  Locations.find().observe({
    added: function (doc) {
      var burnEvent = Events.findOne({location: doc._id}),
          community = Communities.findOne({location: doc._id})
          latlng = { lat: doc.lat, lng: doc.lng },
          props = {};
      
      if (burnEvent) {
        props.title = burnEvent.name, 
        // TODO: differentiate icon based on type of event
        props.icon = eventMarker
      }
      else if (community) {
        props.title = community.description, 
        props.icon = communityMarker
      }
      
      if (burnEvent || community) {
        mapMarkers[doc._id] = L.marker(latlng, props).addTo(map);
      }
    }
  }); 
  
  // var navbar = document.getElementById('navbar');
  // $('#map').css('height', (screen.availHeight - navbar.offsetHeight) + "px");
  $('#map')
    .css('height', '100%')
    .css('position', 'absolute');
};

