const express = require('express');
var bodyParser = require("body-parser");
const cloudfunctions = require("./index.js");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const removePathRoot = (req, resp, fn) => {
    const secondSlashPos = req.url.substr(1).indexOf("/") + 1;
    if(secondSlashPos == 0) {
        req.url = "/";
    } else {
        req.url = req.url.substr(secondSlashPos);
    }
    return fn(req, resp);
};

//POST
app.post('/openalprhook*', (req, resp) => removePathRoot(req, resp, cloudfunctions.openalprhook));

//GET
app.get('/api*', (req, resp) => removePathRoot(req, resp, cloudfunctions.api));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//debug it with:
//curl --header "Content-Type: application/json" --data '{"username":"xyz","password":"xyz"}' http://localhost:3000/openalprhook