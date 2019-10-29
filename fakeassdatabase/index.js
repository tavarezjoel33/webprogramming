class FakeAssDatabase {

	constructor() {
		this.data = {};
	}

	create(keyString, valueString) {
		if (this.data[keyString]) {
			throw new Error(`${keyString} already exists!`);
		}
		this.data[keyString] = valueString;
	}

	read(keyString) {
		return this.data[keyString];
	}

	update(keyString, valueString) {
		if (!this.data[keyString]) {
			throw new Error(`${keyString} does not exist!`);
		}
		this.data[keyString] = valueString;
	}

	delete(keyString) {
		if (!this.data[keyString]) {
			throw new Error(`${keyString} does not exist!`);
		}
		delete this.data[keyString];
	}

	dump() {
		return JSON.stringify(this.data);
	}


}
