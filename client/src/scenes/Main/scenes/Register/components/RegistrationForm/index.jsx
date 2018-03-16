import { Button, ControlLabel, FormGroup, FormControl, Col, Form, HelpBlock, Alert } from 'react-bootstrap';
import React from 'react';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Col md={4} mdOffset={4}>
    <h2 className='centered'>Sign up</h2>

    {errors.summary && <Alert bsStyle='danger'>{errors.summary} </Alert>}

    <Form action='/' onSubmit={onSubmit}>

      <FormGroup controlId='formHorizontalName' validationState={errors.name && 'error'} >
        <ControlLabel>Name</ControlLabel>
        <FormControl name='name' type='name' placeholder='Name' onChange={onChange} value={user.name} />
        {errors.name && <HelpBlock>{errors.name}</HelpBlock>}
      </FormGroup>

      <FormGroup controlId='formHorizontalEmail' validationState={errors.email && 'error'}>
        <ControlLabel>Email</ControlLabel>
        <FormControl name='email' type='email' placeholder='Email' onChange={onChange} value={user.email} />
        {errors.email && <HelpBlock>{errors.email}</HelpBlock>}
      </FormGroup>

      <FormGroup controlId='formHorizontalPassword' validationState={errors.password && 'error'}>
        <ControlLabel>Password</ControlLabel>
        <FormControl name='password' type='password' placeholder='Password' onChange={onChange} value={user.password} />
        {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
      </FormGroup>

      <Button type='submit' bsStyle='success'>Create New Account</Button>
    </Form>
  </Col>
);

export default SignUpForm;
