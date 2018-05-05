
// load a map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		
// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',{
maxZoom:18,
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);

var maxdistance;
var geoJSONData;
var allProperties;
var POIdata;
//var optionA;
//var optionB;
//var optionC;
//var optionD;
//var correctOption;		
// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
var client;
// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
var POIlayer;
	
// create the code to get the POIs data using an XMLHttpRequest
function getPOI() {
	client = new XMLHttpRequest();

client.open('GET','http://developer.cege.ucl.ac.uk:30303/getPOI');

	client.onreadystatechange = POIResponse; // note don't use POIResponse() withbrackets as that doesn't work
	client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function POIResponse() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// once the data is ready, process the data
		POIdata = client.responseText;
		//geoJSONData = client.responseText;
		loadPOIlayer(POIdata);
	}
	
	var getJSON = JSON.parse(POIdata);
	
	//Code to access the coordinates, questions options and correct answer, 
	//then store them in the following variables
	allProperties = getJSON[0]["features"].map(function(feature) {
	var coordinatesFeature = feature["geometry"]["coordinates"];
	var questionsFeature = feature["properties"]["question"];
	var featureOptionA = feature["properties"]["opta"];
	var featureOptionB = feature["properties"]["optb"];
	var featureOptionC = feature["properties"]["optc"];
	var featureOptionD = feature["properties"]["optd"];
	var answerFeature = feature["properties"]["answer"];
	var longitudeFeature = coordinatesFeature[0];
	var latitudeFeature = coordinatesFeature[1];
	return {
		longitudeF: longitudeFeature,
		latitudeF: latitudeFeature,
		questionF: questionsFeature,
		optaF: featureOptionA,
		optbF: featureOptionB,
		optcF: featureOptionC,
		optdF: featureOptionD,
		answerF: answerFeature,
		
	}
	
});	
}
	console.log(allProperties);

//Code to access the	
// convert the received data - which is text - to JSON format and add it to the map
function loadPOIlayer(POIdata) {
		
	// convert the text to JSON
	var POIjson = JSON.parse(POIdata);
		
	// add the JSON layer onto the map -it will apper using the default icons
	POIlayer = L.geoJson(POIjson).addTo(mymap);
			
	//change the map zoom so that all the data is shown
	mymap.fitBounds(POIlayer.getBounds());
}

	
// code to track the user location
var position_marker //Global variable 
			
function trackLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
		navigator.geolocation.getCurrentPosition(getDistanceFromPoint);//not usual
		} else {
			document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
		}
}
		
function showPosition(position) {
	if (position_marker){
		mymap.removeLayer(position_marker); //Remove previous position_marker if there is one //unusual
	}
	position_marker = L.circleMarker([position.coords.latitude, position.coords.longitude], {radius: 4}).addTo(mymap);
	mymap.setView([position.coords.latitude, position.coords.longitude], 25);
}
		

		// get distance function with an array
	

function getDistanceFromPoint(position){  //name
	//find the coordinates of a point to test using this website: https://itouchmap.com/latlong.html
	//var lat = 51.557102 
	//var lng = -0.113329
	// returns the distance in kilometers
		
	
	//var listCoords = [ {lat:51.52445, lon:-0.13412},{lat:51.52422, lon: -0.13435},{lat:51.52479, lon:-0.13213},{lat:51.52379, lon:-0.13417}];
	var maxDistance = 10;
    var minDistance = null;
	var j = null;
	for(var i = 0; i < allProperties.length; i++) {
		var distance = calculateDistance(position.coords.latitude, position.coords.longitude, allProperties[i].latitudeF,allProperties[i].longitudeF, 'K');
		document.getElementById('showDistance').innerHTML = "Distance: " + distance;
		if (distance<= maxDistance&&(minDistance==null||distance<minDistance)){
			minDistance=distance;
			j=i;
		}
	}

//The following code creates a proximity alert,
//Then if the person is close enough, they could play the game. 
	if (j!= null) {
		alert("Alright lets play ..... Scroll down!");
		//Sending the question and options to the html file so that user can see it
		document.getElementById('requiredQuestion').innerHTML = allProperties[j].questionF;
		document.getElementById('optiona').innerHTML = allProperties[j].optaF;
		document.getElementById('optionb').innerHTML = allProperties[j].optbF;
		document.getElementById('optionc').innerHTML = allProperties[j].optcF;
		document.getElementById('optiond').innerHTML = allProperties[j].optdF;
		//document.getElementById('answer').innerHTML = allProperties[j].answerF;

	} else if (j== null) { 
		alert("But you are far from our game; press show points and get closer !!");
	}	
}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
                                             // where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;}  // convert miles to km
	if (unit=="N") { dist = dist * 0.8684 ;}    // convert miles to nautical miles
	return dist;
}


	

	
	//////////////
	
	var xhr; // define the global variable to process the AJAX request
	function callDivChange() {
		xhr = new XMLHttpRequest();
		var filename = document.getElementById("filename").value;
		xhr.open("GET", filename, true);
		xhr.onreadystatechange = processDivChange;
		try {
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		catch (e) {
			// this only works in internet explorer
		}
		xhr.send();
	}

	function processDivChange() {
		if (xhr.readyState < 4) // while waiting response from server
			document.getElementById('ajaxtest').innerHTML = "Loading...";
		else if (xhr.readyState === 4) { // 4 = Response from server has been completely loaded.
			if (xhr.status == 200 && xhr.status < 300)// http status between 200 to 299 are all successful
				document.getElementById('ajaxtest').innerHTML = xhr.responseText;
		}
	}