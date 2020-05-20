'use strict';
require('dotenv').config();
const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;

exports.openalprhook = async (request, response) => {

  let client;
  try {
    switch (request.get('content-type')) {
      case 'application/json':
        client = await MongoClient.connect(config.mongodb_url);
        let db = client.db(config.dbName);
        await db.collection(config.rawDataCol).insert(request.body);
        break;

      default:
        console.error("I don't know what request is this");
    }
    response.status(200).send(request.body);
  }
  catch (err) {
    response.status(400).send(err);
    console.error(err);
  }
  finally {
    if (client)
      await client.close();
  }
};

exports.event = (event, callback) => {
  callback();
};
