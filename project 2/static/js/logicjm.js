// function buildMetadata(station_name) {
//     var selector = d3.select("#station-metadata");

//     selector.html("");
//     var url = (`/${station_name}`);
//     d3.json(url, function(data) {
//         Object.entries(data).forEach(function([key,value]){
//             console.log(key,value);
//             //var age = metaSample.dataset.AGE;
//             //var bb_type = metaSample.dataset.BBTYPE;
//             selector
//                 .append("p")
//                 .text(`${key}:${value}`)
//             });
//         });
// }

var all_data = "/forecast";

d3.json(all_data, function(data){
  console.log(data);

    mapboxgl.accessToken = API_KEY;


    // var layerIDs = [];
    // var filterInput = document.getElementById('filter-input');
    // use this style mapbox for hllshade (mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g)
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
        
        // below code is for hillshading
        // map.addSource('dem', {
        //     "type": "raster-dem",
        //     "url":"mapbox://mapbox.terrain-rgb"
        // });
        // data.forEach(function(marker) {
        // var symbol = marker.station_name;
        // var layerID =  symbol;

    
        map.addLayer({
            "id": "point",
            "source": "single-point",
            "type": "circle",
             "paint": {
                 "circle-radius": 10,
                 "circle-color": "#007cbf"
             }
            
        });

        // map.addSource('nearest-marker', {
        //     type: 'geojson',
        //     data: {
        //       type: 'FeatureCollection',
        //       features: [
        //       ]
        //     }
        //   });

        // map.addLayer({
        //     "id":"hillshading",
        //     "source": "dem",
        //     "type": "hillshade"
        // });

        // map.on('click', function(e) {
        //     var 
        // })
        
        
        //layerIDs.push(layerID);
        //console.log(layerIDs); this does produce a list of station IDs on the map to then filter
    //     });
    // });

        // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
        // makes a selection and add a symbol that matches the result.
        // geocoder.on('result', function(ev) {
        //     var searchResult = ev.result.geometry;
        //     map.getSource('single-point').setData(searchResult);
        // });
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
        var geojson = {};
        geojson['type'] = 'FeatureCollection';
        geojson['features'] = [];
        for (var k in data) {
        var newFeature = {
            "type": "Feature",
            "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(data[k].lon), parseFloat(data[k].lat)]},
            "properties": {
            "title": data[k].station_id,
            "fcst_avg": data[k].fcst_avg
            }
        }
        geojson['features'].push(newFeature);
        }
        //console.log(geojson)
        
      

        // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
        // makes a selection and add a symbol that matches the result.
        geocoder.on('result', function(ev) {
            var searchResult = ev.result.geometry;
            map.getSource('single-point').setData(searchResult);

            geojson.features.forEach(function(station) {
            Object.defineProperty(station.properties, 'distance', {
                value: turf.distance(searchResult, station.geometry),
                writable: true,
                enumerable: true,
                configurable: true
                });
            });

            geojson.features.sort(function(a, b) {
                return a.properties.distance - b.properties.distance
            }); 
            //console.log(geojson)

            var closest = geojson.features[0].properties.fcst_avg
            console.log(closest)
        });

    
    });
    // attempt to use turf
    // map.on('click', function(e) {
    //     var markerFeatures = map.queryRenderedFeatures(e.point, { layers: ['point'] });
    //     if (!markerFeatures.length) {
    //       return;
    //     }
      
    //     var markerFeature = markerFeatures[0];
      
    //     var nearestMarker = turf.nearest(markerFeature, coords);
      
    //     if (nearestMarker !== null) {
      
    //       map.getSource('nearest-station').setData({
    //         type: 'FeatureCollection',
    //         features: [nearestMarker]
    //       });
      
    //       map.addLayer({
    //         id: 'nearest-station',
    //         type: 'circle',
    //         source: 'nearest-station',
    //         paint: {
    //           'circle-radius': 12,
    //           'circle-color': '#486DE0'
    //         }
    //       }, 'station');
    // }
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


// function init() {

//     var selector = d3.select("#selDataset");
//     var url = ("/names");

//     d3.json(url, function(stationNames) {
//         stationNames.forEach((station) => {
//             selector
//                 .append("option")
//                 .text(station)
//                 .property("value", station);
//                 //console.log(station_name);
//         });
//         //for later building of graphs, if necessary
//         const firstStation = stationNames[0];
//         // buildCharts(firstStation);
//         buildMetadata(firstStation);
//     });
// }

// function optionChanged(newStation) {
//     // Fetch new data each time a new sample is selected
//     //buildCharts(newSample);
//     buildMetadata(newStation);
// }
// init();























