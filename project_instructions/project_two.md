NOTE: i will start your server from your fork by calling `node project_two/index.js`. You must tell me otherwise in a `project_two/README.md` if this will not work!

Test ONE:

- When I send a GET request to `localhost:3000/test_one?fruit=${fruit}&cake=${cake}` i should get back:
	`{ "message": { "fruit": "${fruit}", "cake": "${cake}" } }`

Test TWO:

- given this JSON body: `{ "fruit": "${aFruit}", "cake": "${aCake}" }`
- and given the correct headers
- When I send a POST request to `localhost:3000/test_two`, the headers from previous step, and the body from the previous step, i should get back:
	`{ "message": "i love to eat ${aFruit} with ${aCake}" }`

Test THREE:
- Given a a header of `Authorization: Bearer projecttwo`
- When I send a GET request to `localhost:3000/test_three/${aFruit}/${aCake}`, with the above headers, i should get back:
	`{ "message": "you sent ${aFruit} and ${aCake}, but I only eat ${aCake}!" }`
- If I send an incorrect token in the headers, i should get: `{ "message": "unauthorized" }`

Test FOUR:

- given this form body: `"fruit=${aFruit}&cake=${aCake}"`
- and given the correct headers
- When I send a POST request to `localhost:3000/test_four`, the headers from previous step, and the body from the previous step, i should get back:
	`{ "message": "i am getting really sick of eating ${aFruit} after filling up on ${aCake}" }`

Test FIVE: (i will provide a fake database class for this)

- given this json body: `"{ "fruit": ${aFruit}, "cake": ${aCake}"`
- and given the json content headers
- When I send a PUT request to `localhost:3000/test_five/write`, the headers from previous step, and the body from the previous step, i should get back:
	`{ "message": "you sent ${aFruit} and ${aCake}" }`
- If I then send a GET request to `localhost:3000/test_five/read` I get back:
	`{ "${aFruit}": 1, "${aCake}": 1 }`
- If I send the same PUT request again, with new body: `"{ "fruit": ${aSecondFruit}, "cake": ${aCake}"` 
- If I send a GET request to `localhost:3000/test_five/read?fruit=${aSecondFruit}&cake=${aCake}` a second time, I get back:
	`{ "${aFruit}": 1, "${aSecondFruit}": 1, ${aCake}": 2 }`

--- HOW TO TEST ---

(Note...i will be using different fruit & cake strings when i grade...)

Test One:

`curl 'localhost:3000/test_one?fruit=dragonfruit&cake=genoise'` should return ->
`{ "message": { "fruit": "dragonfruit", "cake": "genoise" } }`

Test Two:

`curl -d '{ "fruit": "kiwi", "cake": "sponge" }' -H 'Content-Type: application/json' 'localhost:3000/test_two'` should return ->
`{ "message": "i love to eat kiwi with sponge" }`

Test Three:

`curl -H 'Authorization: Bearer projecttwo' 'localhost:3000/test_three/grape/angelfood'` should return ->
`{ "message": "you sent grape and angelfood, but I only eat angelfood!" }`

`curl -H 'Authorization:: Bearer something else' 'localhost:3000/test_three/grape/angelfood'` should return ->
`{ "message": "unauthorized"}`

Test Four:

`curl -s -d 'fruit=kiwi&cake=sponge' -H 'Content-Type: application/x-www-form-urlencoded' 'localhost:3000/test_four'`
should return ->
`{ "message": i am getting really sick of eating kiwi after filling up on sponge" }`

Test Five:

`curl -X PUT -d '{ "fruit": "orange", "cake": "bad" }' -H 'Content-Type: application/json' 'localhost:3000/test_five/write'` should return ->
`{ "message": "you sent orange and bad" }`

`curl localhost:3000/test_five/read` should return ->
`{ "orange": 1, "bad": 1 }`

`curl -X PUT -d '{ "fruit": "cherry", "cake": "bad" }' -H 'Content-Type: application/json' 'localhost:3000/test_five/write'` should return ->
`{ "message": "you sent cherry and bad" }`

`curl localhost:3000/test_five/read` should return ->
`{ "orange":1, "bad":2, "cherry": 1 }`
