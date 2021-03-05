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
      "fill-color": ["step",
        ["get","NotEnglish"],
        "#5EF688",0.1,
        "#5EF6D4",0.2,
        "#5ECCF6",0.3,
        "#5E80F6",0.4,
        "#885EF6",0.5,
        "#D45EF6",0.6,
        "#7A3B94"]
      }
    })
});

var layers = ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60% and Up']


  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'nyc-nonenglish-fill', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'nyc-nonenglish-fill', function () {
    map.getCanvas().style.cursor = '';
  });
