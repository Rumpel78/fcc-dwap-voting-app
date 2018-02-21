import { Button, ControlLabel, FormGroup, FormControl, Col, Form, Panel, HelpBlock, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Col xs={12} md={6} mdOffset={2}>

    <Form horizontal action='/' onSubmit={onSubmit}>
      <h2 className='centered'>Please sign in</h2>

      {errors.summary && <Alert bsStyle='danger'>{errors.summary} </Alert>}

      <FormGroup controlId='formHorizontalEmail' validationState={errors.email && 'error'} >
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl name='email' type='email' placeholder='Email' onChange={onChange} value={user.email} />
          {errors.email && <HelpBlock>{errors.email}</HelpBlock>}
        </Col>
      </FormGroup>

      <FormGroup controlId='formHorizontalPassword' validationState={errors.password && 'error'}>
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl name='password' type='password' placeholder='Password' onChange={onChange} value={user.password} />
          {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type='submit'>
            Sign in
          </Button>
        </Col>
      </FormGroup>

      <Panel>Don&apos;t have an account? <Link to='/signup'>Create one</Link>.</Panel>
    </Form>
  </Col>
);

export default LoginForm;
