function savingAnswer() {
	alert ("Your answer is successfully uploaded !!"); 

	var requiredquestion = document.getElementById("requiredQuestion").innerHTML; //The innerHTML property sets or returns the HTML content (inner HTML) of an element.
	var answer = document.getElementById("corrAnswer").innerHTML;
	// var phoneid = device.uuid; //based on http://docs.phonegap.com/en/3.0.0/cordova_device_device.md.html#device.uuid --> error: the device is not defined
	alert ("The correct answer is" + " " + answer); // Shows the correct answer to the user of the code.
    alert( requiredquestion);
	//create a name/value pair string as parameters for the URL to send values to the server
	var postString = "requiredquestion=" + requiredquestion + "&answer=" + answer;

	// now get the user's answer --> these are working
	if (document.getElementById("optionaInput").checked) {
 		 postString = postString + "&useranswer=optionaInput";
	}
	if (document.getElementById("optionbInput").checked) {
 		 postString = postString + "&useranswer=optionbInput";
	}
	if (document.getElementById("optioncInput").checked) {
 		 postString = postString + "&useranswer=optioncInput";
	}
	if (document.getElementById("optiondInput").checked) {
 		 postString = postString +"&useranswer=optiondInput";
	}

	alert (useranswer);
	processData(postString);
	
	
}

//Adding an AJAX call and response method
var client;

function processData(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30303/uploadData',true);     // when using on http
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = saved;  
   client.send(postString);
}
// create the code to wait for the response from the data server, and process the response once it is received
function saved() {
  // this function listens out for the server to say that the data is ready - i.e. has state 4
  if (client.readyState == 4) {
    // change the DIV to show the response
    document.getElementById("useranswer").innerHTML = client.responseText; //this is working but is saving something different
    }
}

