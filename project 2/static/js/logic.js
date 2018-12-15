var all_data = "/forecast";

d3.json(all_data, function(data){
  console.log(data);

      mapboxgl.accessToken = API_KEY;

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-95.71, 37.09],
        zoom: 3.5
    });

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });

    map.addControl(geocoder);

    // After the map style has loaded on the page, add a source layer and default
    // styling for a single point.
    map.on('load', function() {
        map.addSource('single-point', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        });

        map.addLayer({
            "id": "point",
            "source": "single-point",
            "type": "circle",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#007cbf"
            }
        });

        // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
        // makes a selection and add a symbol that matches the result.
        geocoder.on('result', function(ev) {
            map.getSource('single-point').setData(ev.result.geometry);
        });
    });

    data.forEach(function(marker){
      var el = document.createElement('div');
      el.className = "marker";
      var coords = [marker.lon, marker.lat];
      new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + marker.fcst_avg + '</h3>'))
        .addTo(map);
    }) 
});



























