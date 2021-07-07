<head><title>A simple loop through GeoJSON</title></head>
<body>
<div id="loopresults">The results will appear here</div>
<button id="start loop" onclick="processGeoJSON()">Click here to start</button>
<script>
// this is the GeoJSON that comes out of the formdata table
var geoJSONString=
'[{"type":"FeatureCollection","features":[{"type":"Feature","geometry":null,"proper
ties":{"name":"claire","surname":"ellul","module":"cegeg129","language":"Italian","
modulelist":"CEGEG077||CEGEG129||","lecturetime":"morning"}},{"type":"Feature","geo
metry":{"type":"Point","coordinates":[-
0.13818,51.524616]},"properties":{"name":"aa","surname":"bb","module":"cc","languag
e":"English","modulelist":"CEGEG077||","lecturetime":"morning"}},{"type":"Feature",
"geometry":{"type":"Point","coordinates":[33,22]},"properties":{"name":"test","surn
ame":"upload","module":"server","language":"Greek","modulelist":"CEGEG077||CEGEG082
||","lecturetime":"morning"}},{"type":"Feature","geometry":null,"properties":{"name
":"a","surname":"bc","module":"d","language":null,"modulelist":null,"lecturetime":n
ull}},{"type":"Feature","geometry":{"type":"Point","coordinates":[51.524559,51.5245
59]},"properties":{"name":"claire","surname":"ellul","module":"cegeg077","language"
:"english","modulelist":"cegeg077|cegeg129|cegeg034","lecturetime":"08:00"}},{"type
":"Feature","geometry":null,"properties":{"name":"asdf","surname":"sdf","module":"s
f","language":null,"modulelist":null,"lecturetime":null}},{"type":"Feature","geomet
ry":null,"properties":{"name":"asdf","surname":"sdf","module":"sf","language":null,
"modulelist":null,"lecturetime":null}},{"type":"Feature","geometry":null,"propertie
s":{"name":"xx","surname":"yy","module":"zz","language":"Italian","modulelist":"CEG
EG077||CEGEG129||CEGEG082||","lecturetime":"afternoon"}},{"type":"Feature","geometr
y":{"type":"Point","coordinates":[-
0.236612409353256,51.4642748296644]},"properties":{"name":"abc","surname":"kkk","mo
dule":"lll","language":"Italian","modulelist":"CEGEG077||CEGEG034||","lecturetime":
"morning"}}]}]';
function processGeoJSON() {
// convert the string of downloaded data to JSON
var geoJSON = JSON.parse(geoJSONString);
alert(geoJSON[0].type);
for(var i = 0; i < geoJSON[0].features.length; i++) {
var feature = geoJSON[0].features[i];
for ( component in feature){
if (component == "geometry") { // this is the geometry
for (geometry in feature[component]){
attribute = "geometry " +
feature[component][geometry];
document.getElementById("loopresults").innerHTML =
document.getElementById("loopresults").innerHTML + " || " +attribute;
}
}
if (component == "properties") { // these are the attributes
for (property in feature[component]) {
attribute = "property " +
feature[component][property];
document.getElementById("loopresults").innerHTML =
document.getElementById("loopresults").innerHTML + " || " +attribute;
}
}
document.getElementById("loopresults").innerHTML =
document.getElementById("loopresults").innerHTML + " <br> ";
}
}
}
alert(geometry);
</script></body>