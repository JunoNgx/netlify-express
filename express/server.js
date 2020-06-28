'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  res.status(200).json({
    message: "this is the main route"
  });
});

router.get('/another', (req, res) => {
  res.status(200).json({
    route: req.originalUrl
  })
});

router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
