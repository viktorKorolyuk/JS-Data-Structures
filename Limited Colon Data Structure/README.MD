# Colon Data Structure
This data structure uses a colon (":") themed format to read data and convert it into JSON.

##### NOTE
###### This data structure format does not allow for nested objects at the moment.
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
