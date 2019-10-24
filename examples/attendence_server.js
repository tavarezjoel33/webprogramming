const express = require('express');

const app = express();
const jsonMiddleware = express.json();

const PORT = 3000;
const TOKEN = 'nowyoudoit';

app.use(jsonMiddleware);

const fakeAssDatabase = {
        "johnny.mccodes@cuny.edu": 1
};

const callback = (req, res) => {
        console.log('headers ->', req.headers);
        console.log('req.body ->', req.body);

        const token = req.headers.authorization.replace('Bearer ', '');

        if (TOKEN !== token) {
                return res.json({ message: 'get outta here hacker' });
        }

        const body = req.body;

        if (!(body.email.includes('cuny.edu'))) {
                return res.json({ message: 'get outta here'});
        }

        if (fakeAssDatabase[body.email]) {
                return res.json({ message: 'already attended' });
        }

        fakeAssDatabase[body.email] = 1;

        return res.json({ message: 'attendence recorded' });
};

app.post('/attend', callback);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
