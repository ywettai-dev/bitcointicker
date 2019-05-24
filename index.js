//jshint esversion:6

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({
    extended: true
}));

//Home
app.get('/', (req, res) => res.sendFile(__dirname + `/index.html`));

app.post('/', function (req, res) {

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var cryptoFiat = crypto+fiat;
    var baseURL = '';

    if(crypto === "BTC"){
        baseURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
    }else{
        baseURL = 'https://apiv2.bitcoinaverage.com/indices/local/ticker/';
    }

    var finalURL = baseURL + cryptoFiat;

    request(finalURL, function(error, response, body){
        
        var data = JSON.parse(body);
        var price = data.last;
        var currentDate = data.display_timestamp;
        
        res.write(`<p>Current Date is ${currentDate}</p>`);
        res.write(`<p>The latest price of ${crypto} in ${fiat}: ${price}</p>`);

        res.send();
    });

});

app.listen(port, () => console.log(`Bitcoin Ticker starts on ${port}`));