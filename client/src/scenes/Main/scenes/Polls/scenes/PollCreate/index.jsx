import 'whatwg-fetch';
import React from 'react';
import { withRouter } from 'react-router-dom';
import PollCreateForm from './components/PollCreateForm';
import PollApi from '../../services/PollApi';

class PollCreate extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: { options: [] },
      pollName: '',
      options: [ { Key: 0, Name: '' }, { Key: 1, Name: '' } ],
    };

    this.submitted = this.submitted.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.changePollName = this.changePollName.bind(this);
  }

  submitted() {
    const poll = {
      name: this.state.pollName,
      options: [],
      createdBy: 'TestUser',
    };
    this.state.options.forEach(item => poll.options.push({ name: item.Name }));

    if (this.validatePoll(poll)) {
      PollApi.CreatePoll(poll).then(_ => this.props.history.push('/polls'));
    }
  }

  validatePoll(poll) {
    const errors = { options: [] };
    if (poll.name.length === 0) errors.name = 'Poll name cannot be empty';
    for (let i = 0; i < poll.options.length; i += 1) {
      if (poll.options[i].name.length === 0) errors.options[i] = 'Option cannot be empty';
    }
    this.setState({ errors });

    return (!errors.name && errors.options.length === 0);
  }

  addOption() {
    const { options } = this.state;
    const key = options[options.length - 1].Key + 1;
    options.push({ Key: key, Name: '' });
    this.setState({ options });
  }

  removeOption(optionKey) {
    const { options } = this.state;

    if (options.length <= 2) {
      return;
    }

    options.splice(optionKey, 1);
    for (let i = 0; i < options.length; i += 1) {
      options[i].Key = i;
    }

    this.setState({ options });
  }

  changePollName(name) {
    this.setState({ pollName: name });
  }

  changeOption(option) {
    const { options } = this.state;
    const changeOption = options.find(o => o.Key === option.Key);
    if (changeOption) {
      changeOption.Name = option.Name;
    }
    this.setState({ options });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <PollCreateForm
        onSubmit={this.submitted}
        onChangePollName={this.changePollName}
        onChangeOption={this.changeOption}
        onAddOption={this.addOption}
        onRemoveOption={this.removeOption}
        errors={this.state.errors}
        pollName={this.state.pollName}
        options={this.state.options}
      />
    );
  }
}

export default withRouter(PollCreate);
