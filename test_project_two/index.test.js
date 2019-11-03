/*

Test One:

curl 'localhost:3000/test_one?fruit=dragonfruit&cake=genoise' should return -> { "message": { "fruit": "dragonfruit", "cake": "genoise" } }

Test Two:

curl -d '{ "fruit": "kiwi", "cake": "sponge" }' -H 'Content-Type: application/json' 'localhost:3000/test_two' should return -> { "message": "i love to eat kiwi with sponge" }

Test Three:

curl -H 'Authorization: Bearer projecttwo' 'localhost:3000/test_three/grape/angelfood' should return -> { "message": "you sent grape and angelfood, but I only eat angelfood!" }

curl -H 'Authorization:: Bearer something else' 'localhost:3000/test_three/grape/angelfood' should return -> { "message": "unauthorized"}

Test Four:

curl -s -d 'fruit=kiwi&cake=sponge' -H 'Content-Type: application/x-www-form-urlencoded' 'localhost:3000/test_four' should return -> { "message": i am getting really sick of eating kiwi after filling up on sponge" }

Test Five:

curl -X PUT -d '{ "fruit": "orange", "cake": "bad" }' -H 'Content-Type: application/json' 'localhost:3000/test_five/write' should return -> { "message": "you sent orange and bad" }

curl localhost:3000/test_five/read should return -> { "orange": 1, "bad": 1 }

curl -X PUT -d '{ "fruit": "cherry", "cake": "bad" }' -H 'Content-Type: application/json' 'localhost:3000/test_five/write' should return -> { "message": "you sent cherry and bad" }

curl localhost:3000/test_five/read should return -> { "orange":1, "bad":2, "cherry": 1 }

*/

const request = require('request-promise-native');
// const { exec } = require('child_process');

// const startServer = () => {

// };

const LOCALHOST = 'http://localhost:3000';
const UNAUTHORIZED = '{"message":"unauthorized"}';

const getAuthorizationHeader = token => ({ 'Authorization': `Bearer ${token}` });
const JSON_HEADER = { 'Content-Type': 'application/json' };
const FORM_HEADER = { 'Content-Type': 'application/x-www-form-urlencoded' };

const getExpectedOne = (fruit, cake) => `{"message":{"fruit":"${fruit}","cake":"${cake}"}}`;
const getExpectedTwo = (fruit, cake) => `{"message":"i love to eat ${fruit} with ${cake}"}`;
const getExpectedThree = (fruit, cake) => `{"message":"you sent ${fruit} and ${cake}, but I only eat ${cake}!"}`;
const getExpectedFour = (fruit, cake) => `{"message":"i am getting really sick of eating ${fruit} after filling up on ${cake}"}`;
const getExpectedFive = (fruit, cake) => `{"message":"you sent ${fruit} and ${cake}"}`;

const fruit = 'fruit';
const cake = 'fruitcake';
const secondCake = 'chocolate';

const testOne = async (done) => {
	const requestOptions = {
		uri: `${LOCALHOST}/test_one?fruit=${fruit}&cake=${cake}`,
		method: 'GET'
	};
	const response = await request(requestOptions);
	const expected = getExpectedOne(fruit, cake); 
	expect(response).toEqual(expected);
	done();
};

const testTwo = async (done) => {
	const requestOptions = {
		uri: `${LOCALHOST}/test_two`,
		headers: {
			...JSON_HEADER
		},
		body: `{ "fruit": "${fruit}", "cake": "${cake}" }`,
		method: 'POST'
	};
	const response = await request(requestOptions);
	const expected = getExpectedTwo(fruit, cake); 
	expect(response).toEqual(expected);
	done();
};

const testThree = async (done) => {
	let requestOptions = {
		uri: `${LOCALHOST}/test_three/${fruit}/${cake}`,
		headers: {
			...getAuthorizationHeader('projecttwo')
		},
		method: 'GET'
	};
	let response;
	
	response = await request(requestOptions);
	let expected = getExpectedThree(fruit, cake); 
	expect(response).toEqual(expected);

	requestOptions = {
		uri: `${LOCALHOST}/test_three/${fruit}/${cake}`,
		headers: {
			...getAuthorizationHeader('wrong')
		},
		method: 'GET'
	};
	try {
		response = await request(requestOptions);
	} catch (e) {
		expect(e.error).toEqual(UNAUTHORIZED);
	}

	done();
};

const testFour = async (done) => {
	const requestOptions = {
		uri: `${LOCALHOST}/test_four`,
		headers: {
			...FORM_HEADER
		},
		body: `fruit=${fruit}&cake=${cake}`,
		method: 'POST'
	};
	const response = await request(requestOptions);
	const expected = getExpectedFour(fruit, cake); 
	expect(response).toEqual(expected);
	done();
};

const testFive = async (done) => {

	let requestOptions = {
		uri: `${LOCALHOST}/test_five/write`,
		headers: {
			...JSON_HEADER
		},
		body: `{ "fruit": "${fruit}", "cake": "${cake}" }`,
		method: 'PUT'
	};
	let response = await request(requestOptions);
	let expected = getExpectedFive(fruit, cake); 
	expect(response.replace(/\\/, '')).toEqual(expected);

	requestOptions = {
		uri: `${LOCALHOST}/test_five/read`,
		headers: {
			...JSON_HEADER
		},
		method: 'GET'
	};
	response = await request(requestOptions);
	expected = JSON.stringify({ fruit: 1, fruitcake: 1 }); 
	expect(response.replace(/\\/, '')).toEqual(expected);

	requestOptions = {
		uri: `${LOCALHOST}/test_five/write`,
		headers: {
			...JSON_HEADER
		},
		body: `{ "fruit": "${fruit}", "cake": "${secondCake}" }`,
		method: 'PUT'
	};
	response = await request(requestOptions);
	expected = getExpectedFive(fruit, secondCake); 
	expect(response.replace(/\\/, '')).toEqual(expected);

	requestOptions = {
		uri: `${LOCALHOST}/test_five/read`,
		headers: {
			...JSON_HEADER
		},
		method: 'GET'
	};
	response = await request(requestOptions);
	expected = JSON.stringify({ fruit: 2, fruitcake: 1, chocolate: 1 }); 
	expect(response.replace(/\\/, '')).toEqual(expected);


	done();
};

describe('project_two tests', () => {
	test('testOne', testOne);
	test('testTwo', testTwo);
	test('testThree', testThree);
	test('testFour', testFour);
	test('testFive', testFive);
});
