const request = require('request-promise-native');

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
