'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const logger = require('./lib/logger');

router.use(bodyParser.urlencoded({extended: false}));

router.post('/login', (req, res) => {
  if(!res.body) return res.failMsg('Invalid information');
  if(!res.body.username || !res.body.password) return res.failMsg('Username and password required.');
  if(res.cookies.user) return res.failMsg('Already logged in.');

  User.findOne({username: res.body.username}).lean().exec()
    .then((user) => {
      user.comparePassword(res.body.password, (valid) => {
        if(!valid) return res.failJson();
        res.cookie('user', user);
        res.successJson();
      });
    });
});

router.post('/register', (req, res) => {
  if(!res.body) return res.failMsg('Invalid information');
  if(!res.body.username || !res.body.password) return res.failMsg('Username and password required.');
  if(res.cookies.user) return res.failMsg('Already logged in.');

  // No need to check username, password - assume it's nice input
  const user = new User({
    username: res.body.username,
    password: res.body.password,
  });
  logger.info('New user: ', user);

  res.cookie('user', user);
});

module.exports = router;
