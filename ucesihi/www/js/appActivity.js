	
// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
var client;
// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
var POIlayer;
	
// create the code to get the POIs data using an XMLHttpRequest
function getPOI() {
	client = new XMLHttpRequest();

client.open('GET','http://developer.cege.ucl.ac.uk:30303/getGeoJSON/quiz/geom');
	client.onreadystatechange = POIResponse; // note don't use POIResponse() withbrackets as that doesn't work
	client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function POIResponse() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// once the data is ready, process the data
		var POIdata = client.responseText;
		loadPOIlayer(POIdata);
	}
}		
// convert the received data - which is text - to JSON format and add it to the map
function loadPOIlayer(POIdata) {
		
	// convert the text to JSON
	var POIjson = JSON.parse(POIdata);
		
	// add the JSON layer onto the map -it will apper using the default icons
	POIlayer = L.geoJson(POIjson).addTo(mymap);
			
	//change the map zoom so that all the data is shown
	mymap.fitBounds(POIlayer.getBounds());
}


// The track location code building
var locationFinder
			
function trackLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.watchlocation(locationShower);
		navigator.geolocation.getCurrentlocation(distanceBetweenPoints);
		} else {
			document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
		}
}
		
function locationShower(location) {
	if (locationFinder){
		mymap.removeLayer(locationFinder);
	}
	locationFinder = L.circleMarker([location.coords.latitude, location.coords.longitude], {radius: 4}).addTo(mymap);
	mymap.setView([location.coords.latitude, location.coords.longitude], 25);
}
		


function distanceBetweenPoints(location){
	//find the coordinates of a point to test using this website: https://itouchmap.com/latlong.html
	var lat = 51.557102 
	var lng = -0.113329
	// returns the distance in kilometers
	var distance = distanceCalculater(location.coords.latitude, location.coords.longitude, lat,lng, 'K');
	document.getElementById('showDistance').innerHTML = "Distance: " + distance;
	
	var defineRadius = 0.05

	
// The following if-statement code alrets the user of near quiz points; or if the user is far from the points:
	if (distance < defineRadius) {
		alert("Alert, you are near a quiz point");
		
	} else { 
		alert("You are far from our game");
		
	}	
}
// This code calculates the distance of the user to the points of interest:
// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function distanceCalculater(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // convert from radians to degrees
	dist = (subAngle/360) * 2 * Math.PI * 3956; // Mathetimatical Equation to calculate the distance
                                             // where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;}  // This code converts miles to km
	if (unit=="N") { dist = dist * 0.8684 ;}    // This code converts miles to nautical miles
	return dist;
}

	
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