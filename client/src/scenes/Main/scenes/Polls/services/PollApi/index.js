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
          return response.json().polls;
        }
        return [];
      });
  }

  static CreatePoll(poll) {
    return new Promise((resolve) => { resolve(true); });
  }
}

export default PollApi;
