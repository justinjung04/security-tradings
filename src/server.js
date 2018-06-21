const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.dev');
const https = require('https');

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, { logLevel: 'warn' }));
app.use(hotMiddleware(compiler));

this.currencyList = [];
this.currencyRates = {};

const getCurrencyRates = https.get('https://www.bankofcanada.ca/valet/observations/group/FX_RATES_DAILY/json', (res) => {
  res.setEncoding('utf8');
  let responseText = '';
  res.on('data', (data) => {
    responseText += data;
  });
  res.on('end', () => {
    const responseObject = JSON.parse(responseText);
    this.currencyList = Object.keys(responseObject.seriesDetail).map(key => key.slice(2, -3));
    this.currencyList.push('CAD');
    this.currencyRates = responseObject.observations.reduce((result, { d, ...rates }) => {
      return {
        ...result,
        [d]: Object.keys(rates).reduce((result, key) => { 
          return {
            ...result, [key.slice(2, -3)]: rates[key].v
          }
        }, {})
      }
    }, {});
  });
});

setInterval(() => {
  getCurrencyRates();
}, 8640000);

app.get('/currency-list', (req, res) => {
  res.json({ data: this.currencyList });
});

app.get('/currency-rates', (req, res) => {
  res.json({ data: this.currencyRates });
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