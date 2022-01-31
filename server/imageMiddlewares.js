const express = require('express');
require('dotenv').config({ path: 'server/config/.env' });
const bodyParser = require('body-parser');

const applyImagesMiddlwares = (server) => {
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.set('view engine', 'ejs');

  server.use(express.static('public'));
};
module.exports = applyImagesMiddlwares;
