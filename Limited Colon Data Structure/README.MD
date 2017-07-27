# (Limited) Colon Data Structure

This data structure uses a colon (":") themed format to read data and convert it into JSON.<br>

## NOTE

### This data structure format does not allow for nested objects.

## Format

Input

```
#Comment
:Object1 (works with spaces!)
    objProperty1 : "First property!"
    objProperty2 : "Second property!"
:outerVariable : 1
```

Output

```json
{
 "Object1 (works with spaces!)": {
  "objProperty1": "First property!",
  "objProperty2": "Second property!"
 },
 "outerVariable": 1
}
```

# Usage

`lCDS.js` is supported as both a module and as a terminal application.

## Module

To add and use this in a module use this code:

```javascript
// To add the module into your application.
const lCDS = require("./lCDS.js");

// To convert lCDS formatted data into JSON.
lCDS.parse(":outerVariable : 1"); // {"outerVariable" : 1}

// To convert JSON data into lCDS by giving a String...
lCDS.stringify('{"outerVariable": 1}'); // :"outerVariable" : 1

// Or an Object.
lCDS.stringify({"outerVariable":1}); // :"outerVariable" : 1
```

## Terminal use
To use in terminal run this code:
```
node lCDS.js <file_name>
```
