'use strict';

const express = require('express');
const config = require('config');
const logger = require('./lib/logger');
const app = express();

const indexRoute = require('./routes/index');
const pagesRoute = require('./routes/pages');

app.use('/', indexRoute);
app.use('/page', pagesRoute);

app.use(express.static('static'));

app.listen({port: config.get('site.port')}, () => {
  logger.info(`Listening on port ${config.get('site.port')}.`);
});
