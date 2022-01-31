const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'server/config/.env' });
const applyMiddlewares = require('./middlewares');
const routes = require('./routes');
const applyImagesMiddlwares = require('./imageMiddlewares');
// Uncomment this line to generate TOKEN_SECRET
// console.log(require('crypto').randomBytes(64).toString('hex'));

const server = express();
const { SERVER_PORT, DB_URL } = process.env;

applyMiddlewares(server);
routes(server);
applyImagesMiddlwares(server);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('connected', () => {
  server.listen(process.env.PORT || SERVER_PORT, () => {
    console.log(`Server listening at http://localhost:${SERVER_PORT}`);
  });
});

db.on('error', (err) => {
  console.log('DB connection failed');
  console.err(err.message);
});
