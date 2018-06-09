const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.dev');
const https = require('https');

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
	logLevel: 'warn'
}));

app.use(hotMiddleware(compiler));

this.currencyList = [];
this.currencyRates = [];
this.cryptoList = [];

https.get('https://www.bankofcanada.ca/valet/observations/group/FX_RATES_DAILY/json', (res) => {
  res.setEncoding('utf8');
  let responseText = '';
  res.on('data', (data) => {
    responseText += data;
  });
  res.on('end', () => {
    const responseObject = JSON.parse(responseText);
    this.currencyList = Object.keys(responseObject.seriesDetail).map(key => key.slice(2, -3));
    this.currencyList.push('CAD');
  });
});

https.get('https://min-api.cryptocompare.com/data/all/coinlist', (res) => {
  res.setEncoding('utf8');
  let responseText = '';
  res.on('data', (data) => {
    responseText += data;
  });
  res.on('end', () => {
    const responseObject = JSON.parse(responseText);
    this.cryptoList = Object.keys(responseObject.Data).map(symbol => ({
      name: responseObject.Data[symbol].CoinName,
      image: responseObject.Data[symbol].ImageUrl,
      symbol
    }));
  });
});

app.get('/currency-list', (req, res) => {
  res.json({ data: this.currencyList });
});

app.get('/currency-rates', (req, res) => {
  
});

app.get('/crypto-list', (req, res) => {
  res.json({ data: this.cryptoList });
});

app.get('/', (req, res) => {
  res.send(`
		<!doctype html>
    <html>
      <head>
        <title>Security tradings</title>
      </head>
      <body>
        <div id='app'></div>
        <script src='bundle.js'></script>
      </body>
    </html>
	`);
});

app.listen(3000, () => console.log('Server running at localhost:3000'));