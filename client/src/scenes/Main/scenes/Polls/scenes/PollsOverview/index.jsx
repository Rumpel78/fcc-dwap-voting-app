import 'whatwg-fetch';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PollList from './components/PollList';
import PollApi from '../../services/PollApi';

class PollsOverview extends React.Component {
  constructor(props) {
    super(props);
    this.allPolls = [];

    this.state = {
      polls: this.allPolls,
      onlyMine: false,
    };
    this.refreshPolls = this.refreshPolls.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
    this.toggleOnlyMinePolls = this.toggleOnlyMinePolls.bind(this);
  }

  componentDidMount() {
    this.refreshPolls();
  }

  refreshPolls() {
    PollApi.GetPolls().then((polls) => {
      this.allPolls = polls;
      this.showPolls(this.state.onlyMine);
    });
  }

  deletePoll(id) {
    PollApi.Delete(id)
      .then(() => {
        this.refreshPolls();
      });
  }

  toggleOnlyMinePolls() {
    let { onlyMine } = this.state;
    onlyMine = !onlyMine;
    this.setState({ onlyMine });
    this.showPolls(onlyMine);
  }

  showPolls(onlyMine) {
    if (onlyMine) {
      const polls = this.allPolls.filter(p => p.createdBy === this.props.user.name);
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
          <Button onClick={this.toggleOnlyMinePolls} active={this.state.onlyMine}>Only mine polls</Button>
        </ButtonToolbar>
        <br />
        <br />
        <PollList polls={this.state.polls} onDelete={this.deletePoll} user={this.props.user} />
      </div>
    );
  }
}

export default PollsOverview;
