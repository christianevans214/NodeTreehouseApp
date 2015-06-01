//profile.js

var http = require('http');

//function to print out message
function printMessage(username, badgeCount, points){
	var message = username + " has "+badgeCount + " total badge(s) and " + points + " points in Javascript";
	console.log(message);
}
//function to print out error message(s)
function printError(error){
	console.error(error.message);
}

function get(username){
	//Connect to the API URL(teamtreehouse.com/username.json)
	var request = http.get('http://teamtreehouse.com/' + username + '.json', function(response){

		//Read the data
		var body = "";
		response.on("data", function(chunk){
			body += chunk;
		});
	
		//Parse the data -- read from stream into program-friendly layout.
		response.on("end", function(){
			if (response.statusCode === 200){
				try{
					var profile = JSON.parse(body);
					var jsPoints = profile.points.JavaScript;
					var badgeCount = profile.badges.length;
					var name = profile.name; 
					//print message
					printMessage(name, badgeCount, jsPoints);
				} 
				//parse error
				catch(e){
					printError(e);
				}
			}
			else {
				//Status Code Error
				printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
			}		
		});
	
	
	

	});

	//Connection error
	request.on("error", printError);
}

//export out get function
module.exports.get = get;