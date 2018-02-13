const express = require('express');
const Poll = require('mongoose').model('Poll');

const router = new express.Router();

router.get('/secretMessage', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
  });
});

module.exports = router;

