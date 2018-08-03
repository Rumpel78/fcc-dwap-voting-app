import * as React from 'react';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Row } from 'react-bootstrap';
import TwitterLogin from 'react-twitter-auth';
import config from '../../../../../../config';
import User from '../../../../../../types/User';
import TwitterButton from '../TwitterButton';
import "./index.css";

const LoginForm = (
  onSignIn: () => void,
  onRegister: () => void,
  onChange: () => void,
  twitterFailed: () => void,
  twitterSuccess: () => void,
  errors: any, // TODO: Change any
  user: User,
) => (
    <div>
      <Row>
        <Col md={4} mdOffset={4}>
          <Form>
            <h2 className='centered'>Please sign in</h2>

            {errors.summary && <Alert bsStyle='danger'>{errors.summary} </Alert>}

            <FormGroup controlId='formHorizontalName' validationState={errors.username && 'error'} >
              <ControlLabel>Username</ControlLabel>
              <FormControl name='username' type='text' placeholder='Username' onChange={onChange} value={user.Username} />
              {errors.username && <HelpBlock>{errors.username}</HelpBlock>}
            </FormGroup>

            <FormGroup controlId='formHorizontalPassword' validationState={errors.password && 'error'}>
              <ControlLabel>Password</ControlLabel>
              <FormControl name='password' type='password' placeholder='Password' onChange={onChange} value={user.Password} />
              {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
            </FormGroup>

            <div className="centered">
              <Button onClick={onSignIn} type="submit" bsStyle='success'>Sign in</Button>&nbsp;&nbsp;
              <Button onClick={onRegister} bsStyle='primary'>Register</Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <div className="centered">
          <h3>Or</h3>
          <TwitterLogin
            tag='div'
            bsStyle='primary'
            loginUrl={`${config.basePath}/auth/twitter/verify`}
            onFailure={twitterFailed}
            onSuccess={twitterSuccess}
            requestTokenUrl={`${config.basePath}/auth/twitter/reverse`}
          >
            <TwitterButton>Login with Twitter</TwitterButton>
          </TwitterLogin>
        </div>
      </Row>
    </div>
  );

export default LoginForm;
