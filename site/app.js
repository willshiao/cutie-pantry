'use strict';

const express = require('express');
const config = require('config');
const session = require('express-session');
const exphbs = require('express-handlebars');

const logger = require('./lib/logger');

require('./lib/extend').extendResponse(express.response);
const app = express();

const indexRoute = require('./routes/index');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'onqtwodifj12934120',  // For testing only
  resave: false,
  saveUninitialized: true,
  cookie: { }
}));
app.use('/', indexRoute);

app.use(express.static('static'));

app.listen({port: config.get('site.port')}, () => {
  logger.info(`Listening on port ${config.get('site.port')}.`);
});
