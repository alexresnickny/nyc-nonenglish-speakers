mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyMTEiLCJhIjoiY2tsa2RpMHZlMDF6NzJwcGo4NWxhZmxuNCJ9.n5_RQ0yWxBTwjRlaZsxGaQ';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.967442,40.714112], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

// add a navigation control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.on('style.load', function () {
  // add a geojson source
  map.addSource('nyc-nonenglish', {
    type: 'geojson',
    data: '/data/notEnglishByTract.geojson'
  });

  // add a layer to style and display the Source
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
    });

    // add an empty data source, which we will use to highlight the tract the user is hovering over
    map.addSource('highlight-feature', {
       type: 'geojson',
       data: {
         type: 'FeatureCollection',
         features: []
       }
     })

     // add a layer for the highlighted tract
     map.addLayer({
       id: 'highlight-line',
       type: 'line',
       source: 'highlight-feature',
       paint: {
         'line-width': 3,
         'line-opacity': 0.9,
         'line-color': 'white',
       }
     });

     //enable pop-up
     map.on('click', function(e) {
       // query for the features under the mouse, but only in the tracts layer
       var features = map.queryRenderedFeatures(e.point, {
           layers: ['nyc-nonenglish-fill'],
       });

       if (features.length > 0 ) {
         var hoveredFeature = features[0]

         var tractNumber = hoveredFeature.properties.NAMELSAD10
         var totalNumber = hoveredFeature.properties.Tot
         var notEnglishNumber = hoveredFeature.properties.ENG_NOT

         $('#tractNumber').text(tractNumber)
         $('#totalPop').text(totalNumber)
         $('#notEnglish').text(notEnglishNumber)

         // set this tract's polygon feature as the data for the highlight source
         map.getSource('highlight-feature').setData(hoveredFeature.geometry);
       }
     })

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'nyc-nonenglish-fill', function () {
    map.getCanvas().style.cursor = 'pointer';
  })

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'nyc-nonenglish-fill', function () {
    map.getCanvas().style.cursor = '';
  })
})
