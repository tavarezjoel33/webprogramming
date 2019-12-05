const express = require('express');
const pg = require('pg');
const app = express();

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(express.static('build'));
app.use(express.json());

db.connect();

const readTodos = () => db.query('SELECT * from todos;');

app.get('/todos/read', (_, res) => readTodos().then(({ rows: todos }) => res.json({ todos })));

app.put('/todos/update', async (req, res) => {
	const { body: { id, isComplete } } = req;
	console.log('id, isComplete', id, isComplete);
	await db.query(`UPDATE todos set completed = ${isComplete} where id = ${id};`);
	const { rows: todos } = await readTodos();
	return res.json({ todos });
});

app.post('/todos/delete', async (req, res) => {
	const {
		body: {
			id
		} = {}
	} = req;
	await db.query(`DELETE from todos where id = ${id};`);
	const { rows: todos } = await readTodos();
	return res.json({ todos });
});

app.post('/todos/create', async (req, res) => {
	const {
		body: {
			task
		}
	} = req
	await db.query(`INSERT INTO todos (task, completed) VALUES ('${task}', false)`);
	const { rows: todos } = await readTodos();
	return res.json({ todos });
});

app.listen(3000, () => console.log('listnin'));