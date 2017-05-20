'use strict';

const express = require('express');
const config = require('config');
const cookieParser = require('cookie-parser');

const logger = require('./lib/logger');

require('./lib/extend').extendResponse(express.response);
const app = express();

const indexRoute = require('./routes/index');
const pagesRoute = require('./routes/pages');

app.use(cookieParser());
app.use('/', indexRoute);
app.use('/page', pagesRoute);

app.use(express.static('static'));

app.listen({port: config.get('site.port')}, () => {
  logger.info(`Listening on port ${config.get('site.port')}.`);
});
