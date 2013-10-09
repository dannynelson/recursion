// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  if (Array.isArray(obj)) {
  	//TODO: Test for embedded arrays
  	var stringified = [];
  	for (var i = 0; i <  obj.length; i++) {
  		if (Array.isArray(obj[i])) { //if it is an embedded array
  			stringified.push(stringifyJSON(obj[i])); //recursive function
  		} else if (typeof(obj[i]) === "string") { //if it is already a string, add quotes
  			stringified.push('"' + obj[i] + '"');
  		} else { //otherwise, just convert to string
  			stringified.push(String(obj[i]));
  		}
  		//join, add brackets (quotes already included b/c it is a string)
  	}
  	return ("[" + stringified.join(",") + "]"); 
  } 
};
