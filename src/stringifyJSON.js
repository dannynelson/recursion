// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {

  // test for array 
  // loop through each and wrap in brackets
  if (Array.isArray(obj)) {
  	var stringified = [];
  	_(obj).each(function(value) {
      stringified.push(stringifyJSON(value)); 
    })
  	return ("[" + stringified.join(",") + "]"); 

  // test for object (and make sure it is not null)
  // loop, wrap keys in "", and wrap in quotation marks
  } else if (typeof(obj) === "object" && obj !== null) {
  	var stringified = '{'
  	_(obj).each(function(value, key) {
  		//check for illegal values (function or undefined)
  		if (typeof(value) !== "function" && typeof(value) !== "undefined") {
  			stringified += ('"' + String(key) + '":');
  			stringified += ( stringifyJSON(value) + ',' );
  		}
  	})
  	if (stringified[stringified.length - 1] === ',') { //remove last comma if it exists
  		stringified = stringified.slice(0,-1); 
  	}
  	return (stringified += '}');

  // test if it is a string, 
  // wrap in quotation marks
  } else if (typeof(obj) === "string") {
  	return ('"' + obj + '"');

  // otherwise it is a number, function, boolean, undefined, or null
  // convert to string
  } else {
  	return String(obj);
  }
};
