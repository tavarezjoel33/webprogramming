FULLSTACK PROJECT ONE

NOTE: i will start your server from your fork by calling `node project_three/index.js`. You must tell me otherwise in a `project_three/README.md` if this will not work!

Please build a "gif search" app that presents a text input and a search bar. Pressing 'search' should send a request to the back end that hits the gihpy api for gifs related to the search in the search bar. Your front end should receive a JSON response from your server that contains five gifs matching the search text.

Once your front end has JSON describing the five matching gifs, your react code must take over and render the five gifs to the screen. Please make each element containing a gif have the class `gif-result-display`. 

For this project you will build both a front end and back end. Your server will need to serve react.js code - so note you'll need to run `npm build` to export a `build/` folder for the backend to serve.

I will load your front end code at `localhost:3000/`.


Test ONE (back end):

- When I send a GET request to `localhost:3000/` i should get back an html string (response contains `"<html"`).

Test TWO (back end):

- given this JSON body: `{ "searchTerm": "bruh" }`
- and given the correct headers
- When I send a POST request to `localhost:3000/gif_search`, the headers from previous step, and the body from the previous step, i should get back a json payload resembling this:
	`{ "results": [ { "gifUrl": 'http://something', "focusUrl": 'http://something' } ... ] }`

Test THREE (front end):
- `document.querySelector('#gif-search-input')` should return an element.
- `document.querySelectorAll('.gif-result-display')` should return zero elements.

Test FOUR (front end):

- i will type a string into `#gif-search-input'`
- i will run `document.querySelector('#gif-search-submit').click()` and should not get an error.
- i will wait two seconds.
- `document.querySelectorAll('.gif-result-display')` should return five elements.

Test FIVE (front end):

- I run `document.querySelectorAll('.gif-result-display').click()`
- `document.querySelectorAll('.gif-focus-display')` should return exactly one element.
- `document.querySelectorAll('.gif-result-display')` should return zero elements.

---- How to TEST yourself

run from my upstream: `cd test_project_three` then `npm test`
