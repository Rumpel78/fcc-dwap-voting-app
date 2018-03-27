/* global window */

import 'whatwg-fetch';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PollList from './components/PollList';
import PollApi from '../../../../../../services/PollApi';

class PollsOverview extends React.Component {
  constructor(props) {
    super(props);
    this.allPolls = [];

    this.state = {
      polls: this.allPolls,
      onlyMine: false,
    };
  }

  componentDidMount() {
    this.refreshPolls();
  }

  refreshPolls = () => {
    PollApi.GetPolls().then((polls) => {
      this.allPolls = polls;
      this.showPolls(this.state.onlyMine);
    });
  }

  deletePoll = (id) => {
    PollApi.Delete(id)
      .then(() => {
        this.refreshPolls();
      });
  }

  sharePoll = (id, name) => {
    const currentLocation = window.location.href;
    const pollLink = `${currentLocation}/${id}`;
    const url = `https://twitter.com/intent/tweet?url=${pollLink}&text=Give your vote on this Poll: '${name}'&original_referer=${pollLink}`;
    const encodedUrl = encodeURI(url);
    window.open(encodedUrl, '_blank', 'location=yes,height=500,width=600,scrollbars=yes,status=yes');
  }

  toggleOnlyMinePolls = () => {
    let { onlyMine } = this.state;
    onlyMine = !onlyMine;
    this.setState({ onlyMine });
    this.showPolls(onlyMine);
  }

  showPolls = (onlyMine) => {
    if (onlyMine) {
      const polls = this.allPolls.filter(p => p.createdBy === this.props.user.username);
      this.setState({ polls });
    } else {
      this.setState({ polls: this.allPolls });
    }
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Link to='/polls/create'><Button bsStyle='success'>Create new poll</Button></Link>
          <Button onClick={this.refreshPolls} bsStyle='primary'>Refresh</Button>
          {this.props.user && <Button onClick={this.toggleOnlyMinePolls} active={this.state.onlyMine}>Only mine polls</Button>}
        </ButtonToolbar>
        <br />
        <br />
        <PollList polls={this.state.polls} onDelete={this.deletePoll} onShare={this.sharePoll} user={this.props.user} />
      </div>
    );
  }
}

export default PollsOverview;
