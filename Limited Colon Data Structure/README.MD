# Colon Data Structure
This data structure uses colons (":") to format data given to it.

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
```JSON
{
 "Object1 (works with spaces!)": {
  "objProperty1": "First property!",
  "objProperty2": "Second property!"
 },
 "object": 1
}
```
