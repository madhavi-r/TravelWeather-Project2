
var alldata = "/forecast";

d3.json(alldata,function(data){
  console.log(data);




});








































// d3.csv("northamerica_station_information.csv", function(data) {
//   console.log(data);

//     var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "mapbox.streets",
//       accessToken: API_KEY
//     });
//     var baseMaps = {
//       "Street Map": streetmap,
//     };
//     /*
//     var overlayMaps = {
//       Markers: marker
//     };
//     */
//     var myMap = L.map("map", {
//       center: [
//         37.09, -95.71
//       ],
//       zoom: 3.5,
//       layers: [streetmap, /*station*/]
//     });
//     L.control.layers(baseMaps, {
//       //collapsed: false
//     }).addTo(myMap);

//   /*
//   var lat = []
//   var lng = []
//   data.forEach((obs) => {
//     Object.entries(obs).forEach(function([key,value]) {
//         if (key === "lat") {
//             lat.push(value)
//         }
//         if (key === "lon") {
//             lng.push(value);
//         }         
//     });
//   });
//   //console.log(lat)
//   //console.log(lng)
//   */

//   for (i = 0; i < data.length; i++) { 
//     var marker = L.marker([data[i].lat, data[i].lon]).addTo(myMap);;
//   }
  
  
// });
// /*


// function createFeatures(earthquakeData) {
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
//       "<p> Magnitude: " + feature.properties.mag + "</p>");
//   }

//   function circleStyling(feature) {
//   	return {
//       color: "black",
//       radius: feature.properties.mag * 4,
//       fillColor: magColor(feature.properties.mag),
//       fillOpacity: 1,
//       weight: 0.75,
//   	};
//   }
//   function pointToLayer(feature, coord) {
//     return L.circleMarker(coord, circleStyling(feature)); 
//   }

//   var earthquakes = L.geoJSON(earthquakeData, {
//     pointToLayer:pointToLayer,
//     onEachFeature: onEachFeature
//   });
//   createMap(earthquakes);
// }


// */


