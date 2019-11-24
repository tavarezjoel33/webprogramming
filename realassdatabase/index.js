const { Client } = require('pg');

const buildQueryExecutor = client => query => db.query(query)
	.then(({ rows = [] }) => rows)
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

db.connect();

const main = async () => {

	const executeQuery = buildQueryExecutor(db);

	const create = `CREATE TABLE names (
		id SERIAL PRIMARY KEY,
		name text
	);`;
	const insert = `INSERT INTO names values (nextval('names_id_seq'), 'bruh');`;
	const read = `SELECT * FROM names;`;

	let result;

	try {
		result = await executeQuery(create);
		console.log(result);
	} catch (err) {
		console.error();
	}

	result = await executeQuery(insert);
	console.log(result);

	result = await executeQuery(read);
	console.log(result);

	db.end();
};

main();
