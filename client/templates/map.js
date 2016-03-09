// REF: Leaflet documentation: http://leafletjs.com/reference.html

var activeMarker = null;

var _normalClass,
    _highlightClass,
    _highlighted = false, 

    _classBase = 'awesome-marker-icon-';
    

// no `var` here so this will be globally accessible (used by search results)
// TODO: consider inserting into Session instead
mapMarkers = {};

Template.map.events({
  'click': function() {
    var activeContainer = Session.get('activeContainer');
    
    if (activeContainer) {
      $(activeContainer).hide(500);
    }
    
    $('#search input').val('');
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
  
  map.setView([50, 10], 5);
  
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
        props.title = burnEvent.name;
        // TODO: differentiate icon based on type of event
        props.icon = eventMarker;
        props.type = 'event';
        props.id = burnEvent._id;
        props.hoverColor = 'lightgreen';
      }
      else if (community) {
        props.title = community.description;
        props.icon = communityMarker;
        props.type = 'community';
        props.id = community._id;
        props.hoverColor = 'pink';
      }
      
      props.toggleHoverColor = function() {
        var obj = (this.type === 'event') 
                  ? Events.findOne(this.id)
                  : Communities.findOne(this.id), 
          
            marker = mapMarkers[obj.location];
          
        _normalClass = _classBase + this.icon.options.markerColor;
        _highlightClass = _classBase + this.hoverColor;

        if (marker) {
          if (_highlighted) {
            marker._icon.classList.remove(_highlightClass);
            marker._icon.classList.add(_normalClass);
            _highlighted = false;
          }
          else {
            marker._icon.classList.remove(_normalClass);
            marker._icon.classList.add(_highlightClass);
            _highlighted = true;
          }
        }
      };
      
      
      if (burnEvent || community) {
        mapMarkers[doc._id] = L.marker(latlng, props)
          .on('click', function(event) {
            var options = event.target.options, 
                sessionVar = 'selected' + options.type.capitalize() + 'Id', 
                selector = '#' + options.type + 'Detail.modal';
            
            Session.set(sessionVar, options.id);
            Session.set('activeModal', selector);
            
            $(selector)
              .modal({detachable: false})
              .modal('show');
            
            // map.setView(<LatLng> center, <Number> zoom?, <zoom/pan options> options?)
            console.log('TODO: scroll and zoom map so that event or community is centered in remaining space');
          })
          .on('mouseover', function(event) {
            this.options.toggleHoverColor();
          })
          .on('mouseout', function(event) {
            this.options.toggleHoverColor();
          })
          .addTo(map);
      }
    }
  }); 
  
  $('#map')
    .css('height', '100%')
    .css('position', 'absolute');
};
