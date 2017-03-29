var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/')
  // returns object of all users
  .get(function(req, res) {
    console.log('get route', res)
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);

      return res.send(users);
    });
  })
  // adds new user to db
  .post(function(req, res) {
    // find the user first in case the email already exists
    console.log('post route, before database call')
    console.log('**************\n', req.body)
    User.findOne({ email: req.body.email }, function(err, user) {
      if (user) return res.status(400).send({ message: 'Email already exists' });

      User.create(req.body, function(err, user) {
        if (err) return res.status(500).send(err);
        console.log('server after added to db', user);
        return res.send(user);
      });
    });
  });

router.get('/:id', function(req, res) {
  // find single user
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    console.log(user)
    return res.send(user);
  });
});

module.exports = router;
