import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import PollPieChart from './components/PollPieChart';
import PollApi from '../../services/PollApi';
import PollOptionRow from './components/PollOptionRow';

class PollShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {},
      disabled: false,
    };

    this.vote = this.vote.bind(this);
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
        this.setState({ disabled: false });
      });
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
      </div>
    );
  }
}

export default PollShow;
