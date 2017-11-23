//when the jQuery Mobile page is initialised
var watchID
var count = 0

$(document).on('pageinit', function() {
	
	//set up listener for button click
	$('#onButton').on('click', getPosition);
	
	$('#offButton').on('click', locationoff);
	
	
	$('#time').val("Press the button to get location data");
	


	
	
});

function locationoff(){
	
	$('#time').val("Location is turned off");
	$('#lattext').val("Location is turned off");
	$('#longtext').val("Location is turned off");
	$('#heading').val("Location is turned off");
	navigator.geolocation.clearWatch(watchID);
	count = 0;
	
}


function getPosition() {
	
	var locationOptions = {
	maximumAge: 10000,
	timeout: 6000,
	enableHighAccuracy: true
	};
	
	if (count == 0){ 
	
	count++
	
	watchID = navigator.geolocation.watchPosition(successPosition, failPosition, locationOptions);
	
	$('#time').val("Getting data...");
	
	
	};
	
	//navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var time = Date(position.timestamp);
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	//var accuracy = position.coords.accuracy;
	//var altitude = position.coords.altitude;
	//var altAccuracy = position.coords.altitudeAccuracy;
	var heading = position.coords.heading;
	//var speed = position.coords.speed;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#lattext').val("Latitude is " + latitude);
	$('#longtext').val("Longitude is " + longitude);
	//$('#accuracy').val("Accuracy is " + accuracy);
	//$('#altitude').val("Altitude is " + altitude);
	//$('#altAccuracy').val("Altitude accuracy is " + altAccuracy);
	$('#heading').val("Heading is " + heading);
	//$('#speed').val("Speed is " + speed);
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}
