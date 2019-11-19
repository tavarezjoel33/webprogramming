const request = require('request-promise-native');

const LOCALHOST = 'http://localhost:3000';

const JSON_HEADER = { 'Content-Type': 'application/json' };

const testOne = async (done) => {
	const requestOptions = {
		uri: `${LOCALHOST}`,
		method: 'GET'
	};
	const response = await request(requestOptions);
	expect(response.includes('<html')).toEqual(true);
	done();
};

const testTwo = async (done) => {

	const searchTerm = 'bruh';

	const requestOptions = {
		uri: `${LOCALHOST}/gif_search`,
		headers: {
			...JSON_HEADER
		},
		body: `{ "searchTerm": "${searchTerm}" }`,
		method: 'POST'
	};
	const response = await request(requestOptions);
	const {
		results: [
			{
				gifUrl,
				focusUrl
			}
		] = []
	} = JSON.parse(response);

	expect(gifUrl).toBeTruthy();
	expect(focusUrl).toBeTruthy();
	done();
};

describe('project_two tests', () => {
	test('testOne', testOne);
	test('testTwo', testTwo);
});

