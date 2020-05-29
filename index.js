'use strict';
require('dotenv').config();
const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;
// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

exports.openalprhook = async (request, response) => {

  let client;
  try {
    switch (request.get('content-type')) {
      case 'application/json':
        client = await MongoClient.connect(config.mongodb_url);
        let db = client.db(config.dbName);
        await db.collection(config.rawDataCol).insert(request.body);

        //ask the client to upload the image and video for this event
        const topicName = 'publish-images';

        // Publishes the message as a string
        const dataBuffer = Buffer.from(request.body.best_uuid);

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId}: ${request.body.best_uuid} published.`);

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
