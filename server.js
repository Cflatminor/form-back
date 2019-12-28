'use strict';

require('dotenv').config();

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();
const router = express.Router();
const port = process.env.port || 8000;

const database = require('./config/database.js');
const headers = require('./config/headers.js');
const controllers = require('./src/controller/index.js');

app.use(express.static(path.join(__dirname + '')));
app.use(express.urlencoded({ extended: true }));
app.use(headers);

MongoClient.connect(database.url, database.options, (error, database) => {
  if (error) return console.log(error);

  app.use(controllers(router, database));

  app.listen(port, () => {
    console.log('we are on ' + port);
  });
});

process.on("SIGINT", () => {
  MongoClient.close();
  process.exit();
});
