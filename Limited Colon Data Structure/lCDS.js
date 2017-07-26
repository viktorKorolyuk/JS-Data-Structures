/*
* Author: Viktor Korolyuk
* Description: Small JSON alternative data-structure
* License: ISC
*/

// Setting a shortcut for faster use
const print = console.log;

// Adding FilySystem module for demo's
const fs = require("fs");

// Parse the input into JSON
function read(input) {
	// Remove tab formatting
	input = input.replace(/\t/g, "");

	// Create an empty object to hold translated values
	var obj = {};

	// Split the text by property-name delimiter
	var objArray = input.split(/^:/gm).splice(1);
	objArray.forEach(e => {

		// Split the data by line
		var section = e.split("\n");

		// Remove blank whitespace elements from array by detecting for non-whitespace characters
		section = section.filter(e => {
			return /\S/.test(e)
		});

		// Check if the entry is not a "single property".
		// ie: Checks if the first value in the array does not contain a non-object variable
		var singleCheck = section[0].split(" : ");
		if (singleCheck.length == 2) {
			obj[singleCheck[0]] = eval(singleCheck[1]);
			return;
		}

		// Add a new object into obj and assign that object instance to _obj. Ergo any actions done against _obj will be reflected in the corosponding element in obj
		var _obj = obj[section[0]] = {};

		// Loop through the array; remove the first array element to prevent reading it.
		section.splice(1).forEach(r => {

			// If its a comment, skip to next loop
			if (/^#/.test(r)) return;

			// Grab everything before the colon as the property name.
			// Grab everything after the colon as the data.
			_obj[r.substring(0, / :/.exec(r).index)] = eval(r.substring(/:/.exec(r).index + 1))
		});
	});

	// Pretty-print and remove invalid entry's such as undefined
	return JSON.stringify(obj, null, " ");
};

// Take JSON object input and translate it into lCDS format
function stringify(input = {}) {

	// If input is anything other than a string of an object, return
	if (typeof input != "object" && typeof input != "string") return;

	// Convert the string into JSON for easier use
	if (typeof input == "string") input = JSON.parse(input);

	// String to hold converted string
	// TODO: Remove blank line at start of formatted string
	var lCDS = "";
	for (var key in input) {

		// Check if the property is not inherited
		if (!input.hasOwnProperty(key)) return;

		// Verify the element is not an object reference.
		if (typeof input[key] !== "object") {
			// TODO: Based on input put the correct format (string, integer, array...)
			lCDS += `\n:${key} : ${JSON.stringify(input[key])}`;
			continue;
		}

		// ONLY OBJECTS BEYOND THIS POINT
		// Second layer of the object. Any other objects beyond this point will be squished into strings

		// Add object definer
		lCDS += `\n:${key}`;
		for (var innerKey in input[key]) {
			lCDS += `\n\t${innerKey} : ${JSON.stringify(input[key][innerKey])}`
		}
	}
	return lCDS;
}

// Silly function to aid in grabbing the needed file.
function get(file_name) {
	return new Promise(resolve => {
		fs.readFile(file_name, (err, data) => {
			if (err) throw err;
			resolve(data.toString());
		});
	});
};


async function demo() {
	print(read(await get(process.argv[2])));
}

// Check if the current module does not have a "parent" object as this indicates it was started by a "require" statement
if (!module.parent) {
	if (!process.argv[2]) {
		print("")
		print("Missing file location.")
		print("Usage: node " + __filename + " file_location");
		process.exit(-1);
	}
	demo();
};

// Allow this file to be used as a module in NodeJS applications.
module.exports = {
	parse: input => read(input),
	stringify: input => stringify(input)
};

// Prevent overriding the functions.
Object.freeze(module.exports);
