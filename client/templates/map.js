// Leaflet documentation: http://leafletjs.com/reference.html

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  var map = L.map('map', {
    minZoom: 4,
    zoomControl: false,
    attributionControl: false
  });
  
  // map.on('dblclick', function(event) {
  //   Markers.insert({latlng: event.latlng});
  // });
  
  map.setView([49, 9], 5);

  // set tile provider (list of providers: http://leaflet-extras.github.io/leaflet-providers/preview/)
  L.tileLayer.provider('Acetate.all').addTo(map);

  Locations.find().observe({
    added: function (doc) {
      var burnEvent = Events.findOne({location: doc._id}),
          latlng = { lat: doc.lat, lng: doc.lng };
      
      L.marker(latlng, {
        title: burnEvent.name
      })
        .addTo(map);
    }
  }); 
};

