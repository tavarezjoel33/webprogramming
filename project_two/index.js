const express = require('express');
const fakeDB = require('./db');
const DATABASE = new fakeDB();
const app = express();
app.use(express.urlencoded());
app.use(express.json());
const TOKEN = 'projecttwo';
const PORT = 3000;
app.get('/test_one', (req, res) => {
    const { fruit , cake } = req.query;
    return res.json({
        message: {
            fruit,
            cake
        }
    });
});
app.post('/test_two', (req, res) => {
    const { fruit , cake } = req.body;
    res.json({
        message: `I love to eat ${fruit} with ${cake}!`
    });
});
app.get('/test_three/:fruit/:cake', (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const { fruit , cake } = req.params;
    if (token != TOKEN) return res.json({ message: `unauthorized` });
    else return res.json({ message: `you sent ${fruit} and ${cake}, but I only eat ${cake}!`});
});
app.post('/test_four', (req, res) => {
    const { fruit , cake } = req.body;
    return res.json({ message: `I am getting really sick of eating ${fruit} after filling up on ${cake}`});
});
app.put('/test_five/write', (req,res) => {
    const { fruit , cake } = req.body;
    try {
        DATABASE.create(fruit, 1);
    }
    catch {
        DATABASE.update(fruit, DATABASE.read(fruit) + 1);
    }
    try {
        DATABASE.create(cake, 1);
    }
    catch {
        DATABASE.update(cake, DATABASE.read(cake) + 1);
    }
    res.json({
        message: `you sent ${fruit} and ${cake}`
    });
});
app.get('/test_five/read', (req, res) => {
    const { fruit , cake } = req.body;
    res.json(
        DATABASE.data
    )
});
app.put('/test_five/write', (req, res) => {
    const { fruit , cake } = req.body;
    res.json({ message: `I am getting really sick of eating ${fruit} after filling up on ${cake}`});
});
app.get('/test_five/read/:fruit/:cake', (req,res) => {
    const { fruit , cake } = req.body;
    try{
        DATABASE.create(fruit, 1);
    }
    catch{
        DATABASE.create(fruit, DATABASE.read(fruit) + 1);
    }
    try{
        DATABASE.create(cake, 1);
    }
    catch{
        DATABASE.create(cake, DATABASE.read(cake) + 1);
    }

    res.json(
        DATABASE.data
    )
});
app.listen(PORT, () => console.log(`Server started on ${PORT}`));