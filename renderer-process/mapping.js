const secrets = require('./_secrets');
// require('./assets/js/mapsjs-core');
// require('./assets/js/mapsjs-service');
// require('./assets/js/mapsjs-ui');
// require('./assets/js/mapsjs-mapevents');

/* Global variables */
var balloonWP = [];
var balloonPoints;
var balloonPath;
var balloonMarker;
var carWP = [];
var carPoints;
var carPath;
var carMarker;
var carIcon;
var pastAlt = [];
var map;
var defaultLayers;

$(document).ready(function() {
  var mapContainer = document.getElementById('map');


  var platform = new H.service.Platform({
    'apikey': secrets.HERE_Maps_Key
  });

  defaultLayers = platform.createDefaultLayers();

  map = new H.Map(
    mapContainer,
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: {lat: 47.7549, lng: -117.4179}
    }
  );

  behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  ui = H.ui.UI.createDefault(map, defaultLayers);

  window.addEventListener('resize', () => map.getViewPort().resize());

  balloonPoints = new H.geo.LineString();
  carPoints = new H.geo.LineString();

  // carIcon = new H.map.Icon('assets/media/car-icon-red.png',{size: {w: 64, h: 64}, anchor: {x: 32, y: 32}})
  carIcon = new H.map.Icon('assets/media/red-car.svg',{size: {w: 64, h: 25}, anchor: {x: 32, y: 25}})
});



