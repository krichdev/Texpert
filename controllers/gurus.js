var express = require('express');
var guru = require('..models/guru');
var router - express.Router();

router.route('/')
  .get(function(req, res) {
    Guru.find(function(err, gurus) {
      if (err) return res.status(500).send(err);

      return res.send(gurus);
    });
  })
  .post(function(req, res) {
    // find the guru first in case the email already exists
    Guru.findOne({ email: req.body.email }, function(err, guru) {
      if (guru) return res.status(400).send({ message: 'Email already exists' });

      Guru.create(req.body, function(err, guru) {
        if (err) return res.status(500).send(err);

        return res.send(guru);
      });
    });
  });

router.get('/:id', function(req, res) {
  Guru.findById(req.params.id, function(err, guru) {
    if (err) return res.status(500).send(err);

    return res.send(guru);
  });
});

module.exports = router;
