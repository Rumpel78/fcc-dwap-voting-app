import Auth from '../../../../../../services/Auth';

class PollApi {
  static GetPoll(id) {
    return id;
  }

  static GetPolls() {
    return fetch('/api/polls', {
      method: 'GET',
      headers: { Authorization: `bearer ${Auth.getToken()}` },
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
      headers: { 'Authorization': `bearer ${Auth.getToken()}`, 'Content-Type': 'application/json' },
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
