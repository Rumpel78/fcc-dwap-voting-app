import { Button, ControlLabel, FormGroup, FormControl, Col, Form } from 'react-bootstrap';
import React from 'react';
import OptionListItem from './components/OptionListItem';

const PollCreateForm = ({ 
  onSubmit, onChange, onAddOption, errors, poll, options, onRemoveOption,
}) =>
  (
    <Col xs={12} md={6}>

      <Form horizontal action='/' onSubmit={onSubmit}>
        <h2 className='centered'>Create new Poll</h2>

        <FormGroup controlId='formHorizontalName' validationState={errors.name && 'error'} >
          <Col componentClass={ControlLabel} sm={3}>
            Name of Poll:
          </Col>
          <Col sm={9}>
            <FormControl name='name' type='text' placeholder='Enter a name for the poll' onChange={onChange} value={poll.name} />
            <FormControl.Feedback />
          </Col>
        </FormGroup>

        {options.map(option => <OptionListItem option={option} onChange={onChange} onRemove={onRemoveOption} errors={{}} />)}

        <FormGroup controlId='formHorizontalName' validationState={errors.name && 'error'} >
          <Col componentClass={ControlLabel} sm={2} smOffset={3}>
            <Button bsStyle='success' onClick={onAddOption}>Add Option</Button>
          </Col>
        </FormGroup>

      </Form>
    </Col>
  );

export default PollCreateForm;
