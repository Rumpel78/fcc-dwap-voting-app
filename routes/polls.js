const express = require('express');
const Poll = require('mongoose').model('Poll');

const router = new express.Router();

function ValidatePoll(poll) {
  const errors = {};
  let isValid = true;
  let message = '';

  if (!poll || !poll.name || typeof poll.name !== 'string' || poll.name.trim().length === 0) {
    isValid = false;
    errors.name = 'Please provide a correct name.';
  }

  if (!poll || !poll.createdBy || typeof poll.createdBy !== 'string' || poll.name.trim().createdBy === 0) {
    isValid = false;
    errors.name = 'Please provide by whom this poll was created.';
  }

  if (!poll || !poll.options || !Array.isArray(poll.options) || poll.options.length === 0) {
    isValid = false;
    errors.name = 'Please provide poll options.';
  }

  if (!isValid) {
    message = 'Poll is invalid';
  }

  return {
    success: isValid,
    message,
    errors,
  };
}

router.get('/polls', (req, res) => {
  Poll.find({}, (err, polls) => {
    res.status(200).json({
      message: 'Current polls',
      polls,
    });
  });
});

router.get('/polls/:pollid', (req, res) => {
  Poll.findById(req.params.pollId, (err, poll) => {
    res.status(200).json({
      message: `Poll with id ${req.params.pollId}`,
      poll,
    });
  });
});

router.put('/polls/:pollid/:option', (req, res) => {
  Poll.findById(req.params.pollid, (err, poll) => {
    if (err) {
      return res.send(err);
    }
    poll.options.forEach((option) => {
      if (option.name === req.params.option) {
        option.count += 1;
      }
    });
    poll.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({ message: 'Poll updated!' });
    });
  });
});

router.post('/polls', (req, res) => {
  const validationResult = ValidatePoll(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationResult);
  }
  const poll = new Poll();
  poll.name = req.body.name;
  poll.createdBy = req.body.createdBy;
  poll.options = req.body.options;
  poll.options.forEach((element) => {
    element.count = 0;
  });

  poll.save((err) => {
    // saved!
    if (err) {
      return res.send(err);
    }
    return res.status(200).json({
      message: 'Added',
    });
  });
});

router.delete('/polls/:pollId', (req, res) => {
  Poll.remove({ _id: req.params.pollId }, (err) => {
    if (err) {
      return res.send(err);
    }
    return res.json('Poll deleted');
  });
});

module.exports = router;
