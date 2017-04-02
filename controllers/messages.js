var express = require('express');
var Message = require('../models/message');
var router = express.Router();

router.route('/')
  // returns object of all messages
  .get(function(req, res) {
    console.log('get route', res)
    Message.find(function(err, messages) {
      if (err) return res.status(500).send(err);

      return res.send(messages);
    });
  })
  // adds new message to db
  .post(function(req, res) {
    // find the message first in case the message already exists
    console.log('message post route, before database call')
    console.log('message**************\n', req.body)
    Message.findOne({ issueTitle: req.body.issueTitle }, function(err, message) {
      if (message) return res.status(400).send(
        { message: 'An issue with that Title already exists' }
      );

      Message.create(req.body, function(err, message) {
        if (err) return res.status(500).send(err);
        console.log('message server after added to db', message);
        return res.send(message);
      });
    });
  });

router.route('/:id')
  .get(function(req, res) {
    // find single message
    Message.findById(req.params.id, function(err, message) {
      if (err) return res.status(500).send(err);
      console.log(message)
      return res.send(message);
    });
  })

module.exports = router;
