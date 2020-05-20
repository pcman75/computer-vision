'use strict';

exports.http = (request, response) => {
  switch (request.get('content-type')) {
    // '{"name":"John"}'
    case 'application/json':
      console.log("Got json");
      console.log(JSON.stringify(request.body, null, 4));
      break;

    default:
      console.log("I don't know what request is this");
  }
  response.status(200).send('Hello World!');
};

exports.event = (event, callback) => {
  callback();
};
