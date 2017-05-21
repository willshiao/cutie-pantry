'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const logger = require('../lib/logger');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => {
  if(!req.session.user) return res.redirect('/login');
  res.render('home', {user: req.session.user, hasTable: true});
});
router.get('/login', (req, res) => {
  if(req.session.user) return res.redirect('/');
  res.render('login', {user: req.session.user});
});
router.get('/register', (req, res) => {
  if(req.session.user) return res.redirect('/');
  res.render('register', {user: req.session.user});
});
router.get('/recipe', (req, res) => res.render('recipe', {user: req.session.user}));
router.get('/addItem', (req, res) => res.render('addItem', {user: req.session.user, addItem: true}));
router.get('/pantry', (req, res) => res.render('pantry'));

router.post('/login', (req, res) => {
  if(!req.body) return res.failMsg('Invalid information');
  if(!req.body.username || !req.body.password) return res.failMsg('Username and password required.');
  if(req.session.user) return res.failMsg('Already logged in.');

  User.findOne({username: req.body.username}).lean().exec()
    .then((user) => {
      if(!user) return res.failMsg('Invalid username');
      User.checkPasswords(req.body.password, user.password, (err, valid) => {
        if(err) return res.errorJson({error: err});
        if(!valid) return res.failMsg('Invalid password');
        req.session.user = user;
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
  if(req.session.user) return res.failMsg('Already logged in.');
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

      req.session.user = userInfo;
      res.successJson();
    });
});

router.get('/userinfo', (req, res) => {
  res.successJson(req.session.user.username);
});

module.exports = router;
