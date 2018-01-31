import { Jumbotron, Button } from 'react-bootstrap';
import React from 'react';
import Auth from '../modules/Auth';

class OnlyForAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.clickCallback = this.clickCallback.bind(this);
  }

  clickCallback(event) {
    event.preventDefault();

    fetch('/api/secretMessage', { method: 'GET', headers: { Authorization: `bearer ${Auth.getToken()}` } })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        this.setState({ message: 'nope' });
        throw new Error();
      }).then((json) => {
        this.setState({ message: json.message });
      });
  }

  render() {
    return (
      <Jumbotron>
        <h1>This site is only for authenticated users</h1>
        <Button onClick={this.clickCallback}>DoIt</Button>
        <p>{this.state.message}</p>
      </Jumbotron>
    );
  }
}

export default OnlyForAuth;
