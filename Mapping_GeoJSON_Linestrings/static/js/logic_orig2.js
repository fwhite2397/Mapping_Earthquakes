// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data.
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
    //"type":"Feature",
    //"properties":{
        //"id":"3469",
        //"name":"San Francisco International Airport",
        //"city":"San Francisco",
        //"country":"United States",
        //"faa":"SFO",
        //"icao":"KSFO",
        //"alt":"13",
        //"tz-offset":"-8",
        //"dst":"A",
        //"tz":"America/Los_Angeles"},
        //"geometry":{
            //"type":"Point",
            //"coordinates":[-122.375,37.61899948120117]}}
//]};

// Grabbing our GeoJSON data - pointToLayer
//L.geoJSON(sanFranAirport, {
//  // We turn each feature into a marker on the map.
//  pointToLayer: function(feature, latlng) {
    //console.log(feature);
    //return L.marker(latlng)
    //.bindPopup("<h2>" + feature.properties.city + "</h2>");
  //}
//}).addTo(map);

// Grabbing our GeoJSON data - onEachFeature
//L.geoJSON(sanFranAirport, {
//  // We turn each feature into a marker on the map.
//  onEachFeature: function(feature, layer) {
    //console.log(layer);
    //layer.bindPopup("<h2>Airport code:" + feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name + "</h3>");
  //}
//}).addTo(map);



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/fwhite2397/Mapping_Earthquakes/main/Mapping_Geo_JSON_Points/Resources/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.

//L.geoJSON(data).addTo(map);
L.geoJSON(data, {
   onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2>Airport code:" + feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name + "</h3>");
  }
}).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);