mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyMTEiLCJhIjoiY2tsa2RpMHZlMDF6NzJwcGo4NWxhZmxuNCJ9.n5_RQ0yWxBTwjRlaZsxGaQ';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.967442,40.714112], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

// function to translate percentage into color


// add a navigation control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.on('style.load', function () {
  // add a geojson source
  map.addSource('nyc-nonenglish', {
    type: 'geojson',
    data: '/data/notEnglishByTract.geojson'
  });

// add a layer to style and display the addSource
  map.addLayer({
    'id': 'nyc-nonenglish-fill',
    'type': 'fill',
    'source': 'nyc-nonenglish',
    'layout': {},
    'paint': {
      'fill-color': [
        if ("NotEnglish" < 0.1) {
          
        }
      }
  });
})
