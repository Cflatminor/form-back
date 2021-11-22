'use strict';

require('dotenv').config();

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

const dbConfig = require('./config/database.js');
const headers = require('./config/headers.js');
const controllers = require('./src/controller/index.js');

app.use(express.static(path.join(__dirname + '')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(headers);

app.get("/test", (request, response) => {
  const https = require('https')

  const data = new TextEncoder().encode(
    JSON.stringify({
      todo: 'Buy the milk 🍼'
    })
  )

  const options = {
    hostname: 'unbounded.instructure.com',
    port: 443,
    path: '/api/v1/accounts',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer 18381~qAHafZFp996oNp6q57UBAdAmR9935SLUCwK14J3JlN3apfcUOIPbBm0I5PFBURcD"
    }
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    var data = [];

    res.on('data', d => {
      data.push(d);
    })

    res.on('end', () => {
      var buffer = Buffer.concat(data);
      response.send(buffer.toString());
    })
  })

  req.on('error', error => {
    console.error(error);
  })

  req.write(data)
  req.end()
});

MongoClient.connect(dbConfig.url, dbConfig.options, (error, database) => {
  if (error) return console.log(error);

  app.use(controllers(router, database));

  app.listen(port, () => {
    console.log('we are on ' + port);
  });

  process.on("SIGINT", () => {
    database
      .close()
      .then(process.exit());
  });
});
