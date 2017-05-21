'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const Item = require('../models/Item');
const Edamam = require('../lib/edamam');

router.use(bodyParser.urlencoded({extended: false}));
router.use(isAuthenticated);

router.post('/items', (req, res) => {
  const body = req.body;
  new Item({
    username: req.session.user.username,
    name: body.name,
    // location: body.location,
    quantity: body.quantity,
    expiryDate: new Date(Date.parse(body.expiryDate)),
  }).save()
    .then(() => {
      // res.successJson();
      res.redirect('/addItem');
    });
});

router.get('/recipe', (req, res) => {
  return Item.find({username: req.session.user.username}).sort({expiryDate: 1}).limit(5).lean().exec()
    .then(items => {
      const names = items.map(item => item.name);
      return Edamam.search(names.join(','))
    })
    .then(data => {
      return res.successJson(data);
    });
});

router.get('/items', (req, res) => {
  return Item.find({username: req.session.user.username}).sort({expiryDate: 1}).lean().exec()
    .then(items => {
      res.successJson(items);
    })
    .catch(err => res.errorJson(err));
});

function isAuthenticated(req, res, next) {
  if(!req.session.user) return res.failMsg('User not logged in');
  next();
}

module.exports = router;
