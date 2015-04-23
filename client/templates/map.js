// REF: Leaflet documentation: http://leafletjs.com/reference.html

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
  
  // map.on('dblclick', function(event) {
  //   Markers.insert({latlng: event.latlng});
  // });
  
  map.setView([49, 9], 5);

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
        props.icon = eventMarker
      }
      else if (community) {
        props.title = community.name, 
        props.icon = communityMarker
      }
      
      L.marker(latlng, props).addTo(map);
    }
  }); 
};

