import { Button, ControlLabel, FormGroup, FormControl, Col, Form, HelpBlock, Alert } from 'react-bootstrap';
import React from 'react';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Col md={4} mdOffset={4}>
    <Form action='/' onSubmit={onSubmit}>
      <h2 className='centered'>Please sign in</h2>

      {errors.summary && <Alert bsStyle='danger'>{errors.summary} </Alert>}

      <FormGroup controlId='formHorizontalEmail' validationState={errors.email && 'error'} >
        <ControlLabel>Email</ControlLabel>
        <FormControl name='email' type='email' placeholder='Email' onChange={onChange} value={user.email} />
        {errors.email && <HelpBlock>{errors.email}</HelpBlock>}
      </FormGroup>

      <FormGroup controlId='formHorizontalPassword' validationState={errors.password && 'error'}>
        <ControlLabel>Password</ControlLabel>
        <FormControl name='password' type='password' placeholder='Password' onChange={onChange} value={user.password} />
        {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
      </FormGroup>

      <center>
        <Button type='submit' bsStyle='success'>Sign in</Button>
      </center>
    </Form>
  </Col>
);

export default LoginForm;
