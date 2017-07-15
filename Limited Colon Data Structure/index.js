const fs = require("fs");
// Setting a shortcut for ease of use
const print = console.log;

if (!process.argv[2]) {
	print("Usage: node " + __filename + " file_location");
	process.exit(-1);
}

async function ss() {
	var s = await get(process.argv[2]);
	print(read(s));
}
ss();

function get(file_name) {
	return new Promise(resolve => {
		fs.readFile(file_name, (err, data) => {
			if (err) throw err;
			resolve(data.toString());
		});
	});
};

function read(input) {
	// Remove formatting such as tabs
	input = input.replace(/\t/g, "");

	// Create an empty object to hold translated values
	var obj = {};

	// Split the text by property-name delimiter
	var objArray = input.split(/^:/gm).splice(1);
	objArray.forEach(e => {
		// Split the data by line
		var section = e.split("\n");

		// Remove blank whitespace from array by detecting for non-whitespace characters
		section = section.filter(e => {
			return /\S/.test(e)
		});

		// Check if the entry is not a "single property"
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
			_obj[r.substring(0, / :/.exec(r).index)] = eval(r.substring(/:/.exec(r).index + 1))
		});
	});
	return JSON.stringify(obj, null, " ");
};
