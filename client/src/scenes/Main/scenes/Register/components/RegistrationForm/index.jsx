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

      <FormGroup controlId='formHorizontalName' validationState={errors.username && 'error'} >
        <ControlLabel>Username</ControlLabel>
        <FormControl name='username' type='text' placeholder='Username' onChange={onChange} value={user.username} />
        {errors.username && <HelpBlock>{errors.username}</HelpBlock>}
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
