// REF: Leaflet documentation: http://leafletjs.com/reference.html

var activeMarker = null;

// no `var` here so this will be globally accessible (used by search results)
// TODO: consider inserting into Session instead
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
  L.tileLayer.provider('CartoDB.Positron').addTo(map);

  Locations.find().observe({
    added: function (doc) {
      // var burnEvent = Events.findOne({location: doc._id, endDateTime: {$gt: new Date()}}),
      var burnEvent = Events.findOne({location: doc._id}),
          community = Communities.findOne({location: doc._id}),
          
          latlng = { lat: doc.lat, lng: doc.lng },
          props = {
            riseOnHover: true
          };
      
      if (burnEvent) {
        props.label = burnEvent.name, 
        // TODO: differentiate icon based on type of event
        props.icon = eventMarker,
        props.type = 'event',
        props.id = burnEvent._id
      }
      else if (community) {
        props.label = community.description, 
        props.icon = communityMarker,
        props.type = 'community',
        props.id = community._id
      }
      
      if (burnEvent || community) {
        mapMarkers[doc._id] = L.marker(latlng, props)
          .bindPopup(props.label, {
            closeButton: false, 
            offset: new L.Point(0, -20)
          })
          .on('mouseover', function(event) {
            this.openPopup();
          })
          .on('click', function(event) {
            this.closePopup();
            console.log('TODO: show HUD panel with event or community details');
            // map.setView(<LatLng> center, <Number> zoom?, <zoom/pan options> options?)
            console.log('TODO: scroll and zoom map so that event or community is centered in remaining space');
          })
          .addTo(map);
      }
    }
  }); 
  
  $('#map')
    .css('height', '100%')
    .css('position', 'absolute');
};
