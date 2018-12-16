function buildMetadata(station_name) {
    var selector = d3.select("#station-metadata");

    selector.html("");
    var url = (`/data/`+`${station_name}`);
    d3.json(url, function(data) {
        Object.entries(data).forEach(function([key,value]){
            console.log(key,value);
            //var age = metaSample.dataset.AGE;
            //var bb_type = metaSample.dataset.BBTYPE;
            selector
                .append("p")
                .text(`${key}:${value}`)
            });
        });
}

var all_data = "/forecast";

d3.json(all_data, function(data){
  console.log(data);

    mapboxgl.accessToken = API_KEY;


    // var layerIDs = [];
    // var filterInput = document.getElementById('filter-input');
    
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g',
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

        map.addSource('dem', {
            "type": "raster-dem",
            "url":"mapbox://mapbox.terrain-rgb"
        });
        // data.forEach(function(marker) {
        // var symbol = marker.station_name;
        // var layerID =  symbol;
    
        map.addLayer({
            "id": "point",
            "source": "single-point",
            "type": "symbol",
            // "paint": {
            //     "circle-radius": 10,
            //     "circle-color": "#202"
            // }
            //"filter": ["==", "station_name", symbol]
        });

        map.addLayer({
            "id":"hillshading",
            "source": "dem",
            "type": "hillshade"
        });
        
        
        //layerIDs.push(layerID);
        //console.log(layerIDs); this does produce a list of station IDs on the map to then filter
    //     });
    // });

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
        .setHTML('<h3> 12/6/18 Data</h3><p> Average Temp:' + marker.fcst_avg + '</p><p> Station Location:' + marker.station_id + '</p><p> Station Name:' + marker.station_name + '</p>' ))
        .addTo(map);
    })

    // filterInput.addEventListener('keyup', function(e) {
    //     //If the input value matches a layer ID set
    //     //its visibility to visible or else hide it
    //     var value = e.target.value.trim().toLowerCase();
    //     layerIDs.forEach(function(layerID) {
    //         map.setLayoutProperty(layerID, 'visibility', 
    //             layerID.indexOf(value) > -1 ? 'visibile' : 'none');
    //     });
    // });
    
});

// function buildMetaData(station_name) {
//     var selector = d3.select("#station-metadata");

//     selector.html("");
//     d3.json(`/data/`+`${station_name}`).then((data) => {
//         Object.entries(data).forEach(function([key,value]){
//             console.log(key,value);
//             //var age = metaSample.dataset.AGE;
//             //var bb_type = metaSample.dataset.BBTYPE;
//             selector
//                 .append("p")
//                 .text(`${key}:${value}`)
//                 //console.log(value);
//             });
//         });
// }

function init() {

    var selector = d3.select("#selDataset");
    var url = ("/names");

    d3.json(url, function(stationNames) {
        stationNames.forEach((station) => {
            selector
                .append("option")
                .text(station)
                .property("value", station);
                //console.log(station_name);
        });
        //for later building of graphs, if necessary
        const firstStation = stationNames[0];
        // buildCharts(firstStation);
        buildMetadata(firstStation);
    });
}
function optionChanged(newStation) {
    // Fetch new data each time a new sample is selected
    //buildCharts(newSample);
    buildMetadata(newStation);
}
init();























