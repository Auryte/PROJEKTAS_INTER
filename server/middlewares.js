const express = require('express');
require('dotenv').config({ path: 'server/config/.env' });
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const applyMiddlewares = (server) => {
  server.use(morgan('tiny'));
  server.use(cors());
  server.use(fileUpload({
    useTempFiles: true
  }));
  server.use(express.json());
};

module.exports = applyMiddlewares;
