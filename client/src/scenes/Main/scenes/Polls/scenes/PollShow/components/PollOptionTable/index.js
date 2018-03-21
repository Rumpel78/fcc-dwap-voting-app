import React from 'react';
import { Table, Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import PollOptionRow from './components/PollOptionRow';

class PollOptionTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddOption: false,
      newOptionName: '',
      error: true,
    };
  }

  toggleAddOption = () => {
    let { showAddOption } = this.state;
    showAddOption = !showAddOption;
    this.setState({ showAddOption });
  }

  handleOptionNameChange = (e) => {
    const name = e.target.value;
    let error = false;
    if (name.length === 0) {
      error = true;
    }

    const double = this.props.poll.options.find(e => e.name === name);
    if (double) {
      error = true;
    }
    this.setState({ error, newOptionName: e.target.value });
  }

  optionAdd = () => {
    this.props.onOptionAdd(this.state.newOptionName);
    this.setState({ showAddOption: false, newOptionName: '', error: true });
  }

  render() {
    const { poll, user } = this.props;
    const { showAddOption, newOptionName, error } = this.state;

    const addOptionLine = (
      <Form inline>
        <FormGroup controlId='formInlineOption' validationState={(error && 'error') || 'success'}>
          <ControlLabel>New Option: </ControlLabel>{' '}
          <FormControl
            type='text'
            value={newOptionName}
            placeholder='Enter name'
            onChange={this.handleOptionNameChange}
          />
          <FormControl.Feedback />
        </FormGroup>{' '}
        <Button onClick={this.optionAdd} disabled={error}>Add</Button>{' '}
        <Button onClick={this.toggleAddOption}>Cancel</Button>
      </Form>
    );

    return (
      <div>
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
              <PollOptionRow key={`row-${o.name}`} option={o} disabled={this.props.disabled} onVote={this.props.onVote} />)}
          </tbody>
        </Table>
        {user && !showAddOption && <Button onClick={this.toggleAddOption}>Add Option</Button>}
        {showAddOption && addOptionLine}
      </div>
    );
  }
}

export default PollOptionTable;
