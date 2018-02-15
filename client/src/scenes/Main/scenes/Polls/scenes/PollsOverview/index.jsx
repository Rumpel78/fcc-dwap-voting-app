import 'whatwg-fetch';
import React from 'react';
import PollList from './components/PollList';
import Auth from '../../../../../../services/Auth';

class PollListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { polls: [] };
    this.getPolls();
  }

  getPolls() {
    // fetch response
    fetch('/api/polls', {
      method: 'GET',
      headers: { Authorization: `bearer ${Auth.getToken()}` },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { polls: [] };
      })
      .then((json) => {
        this.setState({ polls: json.polls });
      });
  }

  render() {
    return (
      <PollList polls={this.state.polls} />
    );
  }
}

export default PollListPage;
