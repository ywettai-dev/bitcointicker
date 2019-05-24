//jshint esversion:6

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

//Home
app.get('/', (req, res) => res.sendFile(__dirname + `/index.html`));

app.post('/', function(req, res) {
    console.log(req.body.crypto);
});

app.listen(port, () => console.log(`Bitcoin Ticker starts on ${port}`));

