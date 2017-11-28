## Bracket Data Structure
This data structure uses brackets to allow nesting of objects.

## Format
Input
```
outerVariable : 1;
Object1 {
	data: 1;
	obj {
	 data: "works";
	}
}
```
Output
```JSON
{
 "outerVariable": 1,
 "Object1 ": {
  "data": 1,
  "obj ": {
   "data": "works"
  }
 }
}
```

## Why two versions?
The first version of the interpreter works, but is long and confusing to read. The second version was created to optimize the first code with an idea of how it should result in the end.
