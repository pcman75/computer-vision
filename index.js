'use strict';
require('dotenv').config();
const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;

exports.openalprhook = (request, response) => {
  switch (request.get('content-type')) {
    // '{"name":"John"}'
    case 'application/json':
      console.log("Got json");
      console.log(JSON.stringify(request.body, null, 4));
      break;

    default:
      console.error("I don't know what request is this");
  }
  response.status(200).send('Hello World!');
};

exports.event = (event, callback) => {
  callback();
};
