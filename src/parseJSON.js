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
  var exists = function(element) {
  	if (array[i] === element) {
  		i++;
  		return true;
  	} else {
  		return false;
  	}
  }
  // var exists = function(elements) {
  // 	var result = false;
  // 	_(arguments).each(function(arg) {
	 //  	if (array[i] === arg) {
	 //  		i++;
	 //  		result = true;
	 //  	}
  // 	})
  // 	return result;
  // }

  var testNext = function(token) {
  	// test for array
		if (exists("[")) {
	  	var arr = [];
	  	while (array[i] !== undefined) {
	  		if (exists("]")) break;
	  		arr.push(testNext(array[i]));
	  		if (exists("]")) break;
	  		if (!exists(",")) throw Error("missing comma");
	  		exists(" ");
	  	}
	  	return arr;
	  } else if (exists("{")) {
	  	var obj = {};
	  	while (array[i] !== undefined) {
	  		if (exists("}")) break;
	  		var key = testNext(array[i]);
	  		if (!exists(":")) throw Error("missing semicolon");
	  		exists(" ");
	  		var value = testNext(array[i]);
	  		obj[key] = value;
	  		if (exists("}")) break;
	  		if (!exists(",")) throw Error("missing comma");
	  		exists(" ");
	  	}
	  	return obj;
	  } else if (exists('"')) {
			var string = "";
			var testForLetter = function(nextToken) {
				if (exists('"')) return;
				//keep it simple for now:
				if (/\\/.test(nextToken)) throw Error("illegal backslash");
				string += nextToken;
				i++;
				testForLetter(array[i]);
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