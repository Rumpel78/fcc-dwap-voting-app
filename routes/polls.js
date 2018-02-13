const express = require('express');
const Poll = require('mongoose').model('Poll');

const router = new express.Router();

router.get('/polls', (req, res) => {
  Poll.find({}, (err, polls) => {
    res.status(200).json({
      message: 'Current polls',
      polls: JSON.stringify(polls),
    });
  });
});

router.get('/polls/:pollid', (req, res) => {
  Poll.findById(req.params.pollId, (err, poll) => {
    res.status(200).json({
      message: `Poll with id ${req.params.pollId}`,
      polls: JSON.stringify(poll),
    });
  });
});

router.put('/polls/:pollid', (req, res) => {
  Poll.findById(req.params.pollid, (err, poll) => {
    if (err) {
      res.send(err);
    }
    poll.name = req.body.name;
    poll.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `Poll ${req.params.pollId} updated!` });
    });
  });
});

router.post('/polls', (req, res) => {
  const poll = new Poll();
  poll.name = req.body.name;
  poll.createdBy = req.body.createdBy;
  poll.options = req.body.options;

  poll.save((err) => {
    // saved!
    if (err) {
      res.send(err);
    }
    res.status(200).json({
      message: 'Added',
    });
  });
});

router.delete('/polls/:pollId', (req, res) => {
  Poll.remove({ _id: req.params.pollId }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json('Poll deleted');
  });
});

module.exports = router;

