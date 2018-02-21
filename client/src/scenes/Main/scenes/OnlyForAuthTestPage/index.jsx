import { Jumbotron, Button } from 'react-bootstrap';
import React from 'react';
import Auth from '../../../../services/Auth';

class OnlyForAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.createPoll = this.createPoll.bind(this);
    this.getPolls = this.getPolls.bind(this);
    this.clickCallback = this.clickCallback.bind(this);
  }

  getPolls(event) {
    event.preventDefault();

    fetch('/api/polls', { method: 'GET', headers: { Authorization: `bearer ${Auth.getToken()}` } })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { message: 'nope' };
      }).then((json) => {
        this.setState({ message: json.message });
        this.setState({ polls: json.polls });
      });
  }

  createPoll(event) {
    event.preventDefault();

    fetch('/api/poll', { method: 'POST', body: JSON.stringify({ Name: 'Blob' }), headers: { Authorization: `bearer ${Auth.getToken()}` } })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { message: 'nope' };
      }).then((json) => {
        this.setState({ message: json.message });
        this.setState({ polls: json.polls });
      });
  }

  clickCallback(event) {
    event.preventDefault();

    fetch('/api/secretMessage', { method: 'GET', headers: { Authorization: `bearer ${Auth.getToken()}` } })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return { message: 'nope' };
      }).then((json) => {
        this.setState({ message: json.message });
      });
  }

  render() {
    return (
      <Jumbotron>
        <h1>This site is only for authenticated users</h1>
        <Button onClick={this.clickCallback}>DoIt</Button>
        <Button onClick={this.getPolls}>GetPolls</Button>
        <Button onClick={this.createPoll}>CreatePoll</Button>
        <p>{this.state.message}</p>
        <div>{this.state.polls}</div>
      </Jumbotron>
    );
  }
}

export default OnlyForAuth;
