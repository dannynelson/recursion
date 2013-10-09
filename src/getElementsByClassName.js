// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  var nodes = document.body.childNodes; 
  var results = [];

  var searchChildren = function(children) {
  	_.each(children, function(node) {
	  	// test if it has a class
	  	if (node.classList) {
	  		//if so see if that class contains className
	  		if (node.classList.contains(className)) {
	  			//if so, push node to results
	  			results.push(node);
	  		}
	  	}
	  	// then test if it has children
	  	if (node.childNodes) {
	  		// if so, execute recursive search on child
	  		searchChildren(node.childNodes);
	  	}
	  })
	}

	//initiate search
	searchChildren(nodes);

  return results;
};

// Node = each part of the DOM (document, elements, attributes, text, comments, etc.)
// Element = section contained by tags (e.g. <p></p>)
// note that childNodes returns an array, must loop through the array to get individual elements
