var express = require('express');
var Provider = require('..models/provider');
var router - express.Router();

router.route('/')
  .get(function(req, res) {
    Provider.find(function(err, providers) {
      if (err) return res.status(500).send(err);

      return res.send(providers);
    });
  })
  .post(function(req, res) {
    // find the provider first in case the email already exists
    Provider.findOne({ email: req.body.email }, function(err, provider) {
      if (provider) return res.status(400).send({ message: 'Email already exists' });

      Provider.create(req.body, function(err, provider) {
        if (err) return res.status(500).send(err);

        return res.send(provider);
      });
    });
  });

router.get('/:id', function(req, res) {
  Provider.findById(req.params.id, function(err, provider) {
    if (err) return res.status(500).send(err);

    return res.send(provider);
  });
});

module.exports = router;
