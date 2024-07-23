const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const FILE_PATH = 'savedata.txt';

app.use(express.json());

app.post('/save', (req, res) => {
    fs.writeFile(FILE_PATH, JSON.stringify(req.body, null, 2), err => {
        if (err) {
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved');
        }
    });
});

app.get('/load', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
