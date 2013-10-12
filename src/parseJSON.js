// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // opposite of stringify
  // parse = analyze a string of symbols accoring to a the rules of a certain language
  // recursive descent parser = verify syntax as it is read left ot right. Read characters and match them with the syntax 
  // *top down parsing = start at highest level of parse tree and work your way down (e.g. array to elements within array)
  // *mutual recursion = two objects are defined in terms of each other
  // http://techblog.procurios.nl/k/news/view/14605/14863/how-do-i-write-my-own-parser-(for-json).html
	//input string of tokens
	//for JSON, only need to look ahead single token LL(1) language
		//each step, look ahead to determine type
		//choose function to parse construct
		//call function and integrate it into construct
  var array = json.split('');
  var i = 0

  var testNext = function(token) {
  	//made some changes
  	// test for array
	  if (/\[/.test(token)) {
	  	var arr = [];
	  	i++;
	  	while (array[i] !== undefined) {
	  		if (array[i] === ",") {
	  			i++;
	  		} else if (array[i] === "]") {
	  			i++;
	  			break;
	  		} else {
	  			arr.push(testNext(array[i]));
	  		}
	  	}
	  	return arr;
	  } else if (/\{/.test(token)) {
	  	var obj = {};
	  	i++;
	  	while (array[i] !== undefined) {
	  		if (array[i] === "}") {
	  			i++;
	  			break;
	  		}
	  		var key = testNext(array[i]);
	  		i++; // skip the :
	  		var value = testNext(array[i]);
	  		if (array[i] === ",") i++;
	  		obj[key] = value;
	  	}
	  	return obj;
	  } else if (/"/.test(token)) {
			var string = "";
			i++;
			var testForLetter = function(nextToken) {
				if (nextToken === '"') {
					i++;
					return;
				} else { //otherwise it is closing 
					string += nextToken;
					i++;
					testForLetter(array[i]);
				}
			}
			testForLetter(array[i]);
			return string;
		} else if (/[\-\d]/.test(token)) {
			var isFloat = false;
			var number = "";
			var testForNumber = function(nextToken) {
				if (/[\-\.\d]/.test(nextToken)) {
					if (nextToken === ".") isFloat = true;
					number += nextToken;
					i++;
					testForNumber(array[i]);
				}
			}
			testForNumber(array[i]);
			number = (isFloat ? parseFloat(number) : parseInt(number));
			return number;
		} else if (/t/.test(token)) {
			i += 4; //skip past all letters of true
			return true;
		} else if (/f/.test(token)) {
			i += 5;
			return false;
		} else if (/n/.test(token)) {
			i += 4;
			return null;
		} else if (/u/.test(token)) {
			i += 9;
			return undefined;
		//error for unexpected ending (ie no closing bracket), or invalid input
		} else {
			throw Error("invalid input");
		}
	}
	//console.log was screwing everything up??? why??
	return testNext(array[i]);
};