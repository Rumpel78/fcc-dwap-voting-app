import Auth from '../../services/Auth';

class PollApi {
  static Validate(poll) {
    const errors = { options: [] };
    let isValid = true;
    let message = '';

    if (!poll || !poll.name || typeof poll.name !== 'string' || poll.name.trim().length === 0) {
      isValid = false;
      errors.name = 'Please provide a correct name.';
    }

    if (!poll || !poll.options || !Array.isArray(poll.options) || poll.options.length === 0) {
      isValid = false;
      errors.optionsMessage = 'Please provide poll options.';
    } else {
      for (let i = 0; i < poll.options.length; i += 1) {
        if (!poll.options[i].name) {
          isValid = false;
          errors.options.push({ key: i, message: 'Option may not be empty' });
        } else {
          for (let j = i + 1; j < poll.options.length; j += 1) {
            if (poll.options[i].name === poll.options[j].name) {
              isValid = false;
              errors.options.push({ key: i, message: 'Option defined multiple times' });
              errors.options.push({ key: j, message: 'Option defined multiple times' });
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

  static GetPoll(id) {
    return fetch(`/api/polls/${id}`, {
      method: 'GET',
      headers: { 'x-auth-token': Auth.getToken() },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { };
      })
      .then(json => json.poll);
  }

  static GetPolls() {
    return fetch('/api/polls', {
      method: 'GET',
      headers: { 'x-auth-token': Auth.getToken() },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { polls: [] };
      })
      .then(json => json.polls);
  }

  static CreatePoll(poll) {
    return fetch('/api/polls', {
      method: 'POST',
      body: JSON.stringify(poll),
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
        return false;
      });
  }

  static Vote(pollId, optionName) {
    return fetch(`/api/polls/${pollId}/${optionName}`, {
      method: 'PUT',
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { success: false, message: 'Sorry, there was a server error' };
      });
  }

  static AddOption(pollId, optionName) {
    return fetch(`/api/polls/${pollId}/${optionName}`, {
      method: 'POST',
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
        return false;
      });
  }

  static Delete(pollId) {
    return fetch(`/api/polls/${pollId}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': Auth.getToken(), 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
        return false;
      });
  }
}

export default PollApi;
