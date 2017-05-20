'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');
const Item = require('../models/Item');

router.use(bodyParser.urlencoded());
router.use(isAuthenticated);

router.post('/items', (req, res) => {
  const body = req.body;
  new Item({
    username: req.session.user.username,
    name: body.name,
    location: body.location,
    quantity: body.quantity,
    expiryDate: body.expiryDate,
  }).save()
    .then(() => {
      res.successJson();
    });
});

router.get('/items', (req, res) => {
  return Item.find({username: req.session.user.username}).lean().exec()
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
