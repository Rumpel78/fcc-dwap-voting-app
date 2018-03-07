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
      options: [ { key: 0, name: '' }, { key: 1, name: '' } ],
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
    };
    this.state.options.forEach(item => poll.options.push({ name: item.name }));

    const validationResult = PollApi.Validate(poll);
    if (validationResult.success) {
      PollApi.CreatePoll(poll).then(this.props.history.push('/polls'));
      return;
    }
    this.setState({ errors: validationResult.errors });
  }

  addOption() {
    const { options } = this.state;
    const key = options[options.length - 1].key + 1;
    options.push({ key, name: '' });
    this.setState({ options });
  }

  removeOption(optionKey) {
    const { options } = this.state;

    if (options.length <= 2) {
      return;
    }

    options.splice(optionKey, 1);
    for (let i = 0; i < options.length; i += 1) {
      options[i].key = i;
    }

    this.setState({ options });
  }

  changePollName(name) {
    this.setState({ pollName: name });
  }

  changeOption(option) {
    const { options } = this.state;
    const changeOption = options.find(o => o.key === option.key);
    if (changeOption) {
      changeOption.name = option.name;
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
