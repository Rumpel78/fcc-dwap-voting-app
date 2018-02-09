const express = require('express');
const Poll = require('mongoose').model('Poll');

const router = new express.Router();

router.get('/secretMessage', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
  });
});

router.get('/polls', (req, res) => {
  Poll.find({}, (err, polls) => {
    res.status(200).json({
      message: 'Current polls',
      polls: JSON.stringify(polls),
    });
  });
});

router.post('/poll', (req, res) => {
  Poll.create({ name: 'Test' });
  res.status(200).json({
    message: 'Added',
  });
});


module.exports = router;

