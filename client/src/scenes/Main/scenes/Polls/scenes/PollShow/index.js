import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import PollPieChart from './components/PollPieChart';
import PollApi from '../../services/PollApi';

class PollShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { poll: {} };
  }

  componentDidMount() {
    PollApi.GetPoll(this.props.match.params.id)
      .then((poll) => {
        this.setState({ poll });
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            {this.state.poll.name && <h1>{this.state.poll.name} <small>({this.props.match.params.id})</small></h1> }
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
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
                {this.state.poll.options && this.state.poll.options.map(o => o.name &&
                  <tr>
                    <td>{o.name}</td>
                    <td>{o.count}</td>
                    <td><Button bsSize='small' bsStyle='primary'>Vote!</Button></td>
                  </tr>)}
              </tbody>
            </Table>
          </Col>
          <Col sm={9}>
            <PollPieChart poll={this.state.poll} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PollShow;
