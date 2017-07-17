const fs = require("fs");
const pp = input => {
	// Use JSON pretty-print feature to help in debugging and presentation
	if (input != ("" || undefined))
		console.log(JSON.stringify(input, null, " "));
	else
		console.log("\n");
}

function get(e) {
	return new Promise(r => {
		fs.readFile(e, (err, data) => {
			if (err) throw err;
			r(data.toString());
		});
	});
}

function read(input) {
	var obj = {};
	var _obj = obj;
	var scopeStack = [_obj];
	var d = new Date();
	// We now have a map of the object. We know when it opens a new one.
	// We can assume that every element in the array after the first is inside of it, unless it was exited out of by a closing bracket

	try {
		// Remove pesky newline and tab
		input = input.replace(/[\t\n]/g, "").split(/{(?!\/)/g);
		input.forEach((a, index) => {
			var b = a.split(";");
			if (index === input.length - 1) {

				// Last element in the array. Scope is global.
				b.forEach(e => {

					// Allowing semi-colon ending
					if (e === "") return;
					for (var i = 0; i < e.split("}").length - 1; i++) {
						scopeStack.pop();
						_obj = scopeStack[scopeStack.length - 1];
						e = e.replace(/}/g, "");
					}
					add(e);
				});
			} else {
				b.forEach(e => {
					if (/(.* *: * (?![\S]))/.test(e)) throw "Format Error: Unknown input data";
					// TODO: The for loop only works if the values after the object definition are non-object. I fixed it by returning out of the [add] function, but it still loops through it, thus wasting time.
					for (var i = 0; i < e.split("}").length - 1; i++) {
						// Change scope
						scopeStack.pop();
						_obj = scopeStack[scopeStack.length - 1];
						e = e.replace(/}/g, "");
					}
					add(e);
				});
				_obj = _obj[b[b.length - 1].replace(/}/g, "")] = {};
				scopeStack.push(_obj);
			};
		});
	} catch (err) {
		errorMessage(err);
	}
	pp(obj);
	pp(new Date() - d);

	function add(_input) {
		_input = _input.split(":");
		if (_input.length === 1) return;
		_obj[_input[0].replace(/\s/g, "")] = tolerable(_input[1]);
	}
}

// Handles data conversion.
function tolerable(input) {
	// If the input has X amount of spaces followed by quotation marks, its a string.
	if (/^ *"/.test(input)) return eval(input);
	var inputTranslate = eval(input);
	if (typeof inputTranslate === "number" || Object.prototype.toString.call(inputTranslate) === '[object Array]') return inputTranslate;
	return input;
};

function errorMessage(err) {
	pp();
	console.log("\tLooks like we got ourselv's a smartass over 'ere Bill.");
	console.log("\x1b[31m", "\t ---[Layer 8 problem has occured]", "\x1b[0m")
	if (err) console.log(`\t\t[${err}]`);
	pp();
	process.exit(-1);
}

// Run the code
get(process.argv[2]).then(e => read(e));
