import { Button, ControlLabel, FormGroup, FormControl, Col, Form, HelpBlock, Alert, Row } from 'react-bootstrap';
import React from 'react';
import TwitterLogin from 'react-twitter-auth';
import TwitterButton from '../TwitterButton';

const LoginForm = ({
  onSubmit,
  onChange,
  twitterFailed,
  twitterSuccess,
  errors,
  user,
}) => (
  <div>
    <Row>
      <Col md={4} mdOffset={4}>
        <Form action='/' onSubmit={onSubmit}>
          <h2 className='centered'>Please sign in</h2>

          {errors.summary && <Alert bsStyle='danger'>{errors.summary} </Alert>}

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

          <center>
            <Button type='submit' bsStyle='success'>Sign in</Button>
          </center>
        </Form>
      </Col>
    </Row>
    <Row>
      <center>
        <h3>Or</h3>
        <TwitterLogin
          tag='div'
          bsStyle='primary'
          loginUrl='http://localhost:3000/auth/twitter/verify'
          onFailure={twitterFailed}
          onSuccess={twitterSuccess}
          requestTokenUrl='http://localhost:3000/auth/twitter/reverse'
        >
          <TwitterButton>Login with Twitter</TwitterButton>
        </TwitterLogin>
      </center>
    </Row>
  </div>
);

export default LoginForm;
