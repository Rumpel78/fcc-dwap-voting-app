/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import PollPieChart from './components/PollPieChart';
import PollApi from '../../../../../../services/PollApi';
import PollOptionRow from './components/PollOptionRow';
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

    this.vote = this.vote.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  componentDidMount() {
    this.refreshPoll();
  }

  refreshPoll() {
    PollApi.GetPoll(this.props.match.params.id)
      .then((poll) => {
        this.setState({ poll });
      });
  }

  vote(optionName) {
    this.setState({ disabled: true });
    PollApi.Vote(this.state.poll._id, optionName)
      .then(() => {
        this.refreshPoll();
        this.setState({ disabled: false, showModal: true, votedOption: optionName });
      });
  }

  modalClose() {
    this.setState({ showModal: false });
  }

  render() {
    const { poll, disabled } = this.state;
    return (
      <div>
        <Link to='/polls'>&lt;&lt; Back</Link>
        <Row>
          <Col md={6}>
            {this.state.poll.name && <h1>{poll.name}</h1> }
            <br />
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Votes</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {poll.options && poll.options.map(o =>
                  <PollOptionRow key={`row-${o.name}`} option={o} disabled={disabled} onVote={this.vote} />)}
              </tbody>
            </Table>
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
