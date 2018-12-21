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

        data.forEach(function(marker){
            var el = document.createElement('div');
            el.className = "marker";
            var coords = [marker.lon, marker.lat];
            new mapboxgl.Marker(el)
              .setLngLat(coords)
              .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML('<h3> Station ID:' + marker.station_id + '</h3>' + '<p> Average Temp:' + marker.fcst_avg + '</p><p> Station Name:' + marker.station_name + '</p>'))
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

            //d3.json("/storelatlon/"+searchResult)

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

            d3.select("#avgtemp").text(closest);

            if (closest <= 32 ) {
                var linkAnchor = d3.select("#scrape_button")
                var scrapeRoute = linkAnchor.attr("href") 
                linkAnchor.attr("href", "/scrape")
            }
            if (closest > 32 && closest <= 55) {
                var linkAnchor = d3.select("#scrape_button")
                var scrapeRoute = linkAnchor.attr("href") 
                linkAnchor.attr("href", "/scrapethree")
            }
            if (closest > 55) {
                var linkAnchor = d3.select("#scrape_button")
                var scrapeRoute = linkAnchor.attr("href") 
                linkAnchor.attr("href", "/scrapetwo")
            }

            console.log(d3.select("#scrape_button").attr("href"))
            // d3.json(/scrapethree,function(data){
            //     data.forEach(function(row){

            //         }
            //     )
            // })
        });

        
        var scrapingButton = d3.select("#scrape_button");
        scrapingButton.on("click", function() {
            


        });




    });



});













