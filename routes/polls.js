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

  if (!poll || !poll.options || !Array.isArray(poll.options) || poll.options.length === 0) {
    isValid = false;
    errors.name = 'Please provide poll options.';
  }

  if (!poll || !poll.options || !Array.isArray(poll.options) || poll.options.length === 0) {
    isValid = false;
    errors.options = 'Please provide poll options.';
  } else {
    for (let i = 0; i < poll.options.length; i += 1) {
      if (!poll.options[i].name) {
        isValid = false;
        errors.options.splice(i, 0, 'Option may not be empty');
      } else {
        for (let j = i + 1; j < poll.options.length; j += 1) {
          if (poll.options[i].name === poll.options[j].name) {
            isValid = false;
            errors.options.splice(i, 0, 'Option defined multiple times');
          }
        }
      }
    }
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

    const option = poll.options.find(o => o.name === req.params.option);
    if (option) {
      option.coount += 1;
    }

    return poll.save((err) => {
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
  poll.createdBy = 'Guest';
  for (let i = 0; i < req.body.options.length; i += 1) {
    poll.options.push({ name: req.body.options[i].name, count: 0 });
  }
  if (req.user) {
    poll.createdBy = req.user.name;
  }

  return poll.save((err) => {
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
