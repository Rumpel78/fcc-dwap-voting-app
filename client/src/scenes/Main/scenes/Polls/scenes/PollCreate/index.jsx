import 'whatwg-fetch';
import React from 'react';
import PollCreateForm from './components/PollCreateForm';


class PollCreate extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: { },
      poll: {},
      options: [ { Key: 1, Name: '' }, { Key: 2, Name: '' } ],
    };

    this.processForm = this.processForm.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  processForm(event) {
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

    options.splice(optionKey - 1, 1);
    for (let i = 0; i < options.length; i += 1) {
      options[i].Key = i + 1;
    }

    this.setState({ options });
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
        onSubmit={this.processForm}
        onChange={this.changeOption}
        onAddOption={this.addOption}
        onRemoveOption={this.removeOption}
        errors={this.state.errors}
        poll={this.state.poll}
        options={this.state.options}
      />
    );
  }
}

export default PollCreate;
