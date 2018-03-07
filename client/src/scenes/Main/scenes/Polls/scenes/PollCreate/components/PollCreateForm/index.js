import { Button, ControlLabel, FormGroup, FormControl, Col, Form, HelpBlock } from 'react-bootstrap';
import React from 'react';
import OptionListItem from './components/OptionListItem';

class PollCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);
  }

  nameChange(event) {
    this.props.onChangePollName(event.target.value);
  }

  render() {
    const {
      onSubmit, onChangeOption, onAddOption, errors, pollName, options, onRemoveOption,
    } = this.props;
    return (
      <Col xs={12} md={6}>

        <Form horizontal action='/' onSubmit={onSubmit}>
          <h2 className='centered'>Create new Poll</h2>

          <FormGroup controlId='formHorizontalName' validationState={errors.name && 'error'} >
            <Col componentClass={ControlLabel} sm={3}>
              Name of Poll:
            </Col>
            <Col sm={9}>
              <FormControl name='name' type='text' placeholder='Enter a name for the poll' onChange={this.nameChange} value={pollName} />
              <FormControl.Feedback />
              {errors.name && <HelpBlock>{errors.name}</HelpBlock>}
            </Col>
          </FormGroup>

          {options.map((option) => {
             let error;
             if (errors.options.length > 0) {
               error = errors.options.find(o => o.key === option.key);
             }
            return <OptionListItem key={option.key} option={option} onChange={onChangeOption} onRemove={onRemoveOption} error={error} />;
          })}

          <FormGroup controlId='formHorizontalName' validationState={errors.name && 'error'} >
            <Col componentClass={ControlLabel} sm={2} smOffset={3}>
              <Button bsStyle='success' onClick={onAddOption}>Add Option</Button>
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalName' validationState={errors.name && 'error'} >
            <Col componentClass={ControlLabel} sm={2} smOffset={3}>
              <Button bsStyle='primary' onClick={onSubmit}>Create Poll</Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}

export default PollCreateForm;
