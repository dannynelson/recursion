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

  var testFor = function(element) {
  	if (array[i] === element) {
  		i++;
  		return true;
  	} else {
  		return false;
  	}
  }
  
  var testNext = function(token) {
		if (testFor("[")) {
	  	var arr = [];
	  	while (array[i] !== undefined) {
	  		if (testFor("]")) break;
	  		arr.push(testNext(array[i]));
	  		if (testFor("]")) break;
	  		if (!testFor(",")) throw Error("missing comma");
	  		testFor(" ");
	  	}
	  	return arr;
	  }
	  if (testFor("{")) {
	  	var obj = {};
	  	while (array[i] !== undefined) {
	  		if (testFor("}")) break;
	  		var key = testNext(array[i]);
	  		if (!testFor(":")) throw Error("missing semicolon");
	  		testFor(" ");
	  		var value = testNext(array[i]);
	  		obj[key] = value;
	  		if (testFor("}")) break;
	  		if (!testFor(",")) throw Error("missing comma");
	  		testFor(" ");
	  	}
	  	return obj;
	  }
	  if (testFor('"')) {
			var string = "";
			var testForLetter = function(nextToken) {
				if (testFor('"')) return;
				//keep it simple for now:
				if (/\\/.test(nextToken)) throw Error("illegal backslash");
				string += nextToken;
				i++;
				testForLetter(array[i]);
			}
			testForLetter(array[i]);
			return string;
		}
		if (/[\-\d]/.test(token)) {
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
		}
		if (/t/.test(token)) {
			i += 4; //skip past all letters of true
			return true;
		}
		if (/f/.test(token)) {
			i += 5;
			return false;
		}
		if (/n/.test(token)) {
			i += 4;
			return null;
		}
		if (/u/.test(token)) {
			i += 9;
			return undefined;
		}
		//error for unexpected ending (ie no closing bracket), or invalid input
		throw Error("invalid input");
	}
	//console.log was screwing everything up??? why??
	return testNext(array[i]);
};