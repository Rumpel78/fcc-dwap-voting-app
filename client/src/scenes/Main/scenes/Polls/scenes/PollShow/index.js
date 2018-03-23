/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PollPieChart from './components/PollPieChart';
import PollApi from '../../../../../../services/PollApi';
import PollOptionTable from './components/PollOptionTable';
import VotedModal from './components/VotedModal';

class PollShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {},
      disabled: false,
      showModal: false,
      votedOption: '',
    };
  }

  componentDidMount() {
    this.refreshPoll();
  }

  refreshPoll = () => {
    PollApi.GetPoll(this.props.match.params.id)
      .then((poll) => {
        this.setState({ poll });
      });
  }

  optionAdd = (optionName) => {
    const { _id } = this.state.poll;
    PollApi.AddOption(_id, optionName)
      .then(() => this.refreshPoll());
  }

  vote = (optionName) => {
    this.setState({ disabled: true });
    PollApi.Vote(this.state.poll._id, optionName)
      .then(() => {
        this.refreshPoll();
        this.setState({ disabled: false, showModal: true, votedOption: optionName });
      });
  }

  modalClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { poll, disabled } = this.state;
    const { user } = this.props;
    return (
      <div>
        <Link to='/polls'>&lt;&lt; Back</Link>
        <Row>
          <Col md={6}>
            {this.state.poll.name && <h1>{poll.name}</h1> }
            <br />
            <PollOptionTable user={user} poll={poll} disabled={disabled} onVote={this.vote} />
          </Col>
          <Col md={6}>
            <PollPieChart poll={poll} />
          </Col>
        </Row>
        <VotedModal show={this.state.showModal} onClose={this.modalClose} name={this.state.votedOption} />
      </div>
    );
  }
}

export default PollShow;
