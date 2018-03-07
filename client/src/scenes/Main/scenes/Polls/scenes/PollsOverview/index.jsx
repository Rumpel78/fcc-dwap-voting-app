import 'whatwg-fetch';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PollList from './components/PollList';
import PollApi from '../../services/PollApi';

class PollsOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = { polls: [] };
    this.refreshPolls = this.refreshPolls.bind(this);
  }

  componentDidMount() {
    this.refreshPolls();
  }

  refreshPolls() {
    this.setState({ polls: [] });
    PollApi.GetPolls().then(polls => 
      this.setState({ polls }));
  }

  render() {
    return (
      <div>
        <Link to='/polls/create'><Button>Create new poll</Button></Link>
        <Button onClick={this.refreshPolls} >Refresh</Button>
        <PollList polls={this.state.polls} />
      </div>
    );
  }
}

export default PollsOverview;
