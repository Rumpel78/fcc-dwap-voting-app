import 'whatwg-fetch';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PollList from './components/PollList';
import PollApi from '../../services/PollApi';

class PollsOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = { polls: [] };
    this.refreshPolls = this.refreshPolls.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
  }

  componentDidMount() {
    this.refreshPolls();
  }

  refreshPolls() {
    this.setState({ polls: [] });
    PollApi.GetPolls().then(polls =>
      this.setState({ polls }));
  }

  deletePoll(id) {
    PollApi.Delete(id)
      .then(() => {
        this.refreshPolls();
      });
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Link to='/polls/create'><Button bsStyle='success'>Create new poll</Button></Link>
          <Button onClick={this.refreshPolls} bsStyle='primary'>Refresh</Button>
        </ButtonToolbar>
        <br />
        <br />
        <PollList polls={this.state.polls} onDelete={this.deletePoll} user={this.props.user} />
      </div>
    );
  }
}

export default PollsOverview;
