'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const logger = require('../lib/logger');

router.use(bodyParser.urlencoded({extended: false}));

router.post('/login', (req, res) => {
  if(!req.body) return res.failMsg('Invalid information');
  if(!req.body.username || !req.body.password) return res.failMsg('Username and password required.');
  if(req.cookies.user) return res.failMsg('Already logged in.');

  User.findOne({username: req.body.username}).lean().exec()
    .then((user) => {
      if(!user) return res.failMsg('Invalid username');
      user.comparePassword(req.body.password, (valid) => {
        if(!valid) return res.failJson();
        res.cookie('user', user);
        res.successJson();
      });
    })
    .catch(err => {
      logger.error(err);
      res.errorJson({err: err});
    });
});

router.post('/register', (req, res) => {
  if(!req.body) return res.failMsg('Invalid information');
  if(!req.body.username || !req.body.password) return res.failMsg('Username and password required.');
  if(req.cookies.user) return res.failMsg('Already logged in.');
  if(req.body.password !== req.body['confirm-password']) return res.failMsg('Password not confirmed');

  // No need to check username, password - assume it's nice input
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
  };
  const user = new User(userInfo);
  user.save()
    .then(() => {
      logger.info('New user: ', userInfo);

      res.cookie('user', userInfo);
      res.successJson();
    });
});

router.get('/userinfo', (req, res) => {
  res.successJson(req.cookies.user.username);
});

module.exports = router;
