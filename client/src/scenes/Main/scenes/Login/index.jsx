import 'whatwg-fetch';
import React from 'react';
import { Alert, Row } from 'react-bootstrap';
import TwitterLogin from 'react-twitter-auth';
import LoginForm from './components/LoginForm';
import TimeoutRedirectedPage from './components/TimeoutRedirect';
import Auth from '../../../../services/Auth';
import TwitterButton from './components/TwitterButton';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
      },
      success: false,
      username: '',
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    fetch('/auth/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    }).then(response => response.json()).then((json) => {
      if (json.success) {
        Auth.authenticateUser(json.token);
        this.setState({
          success: true,
          username: json.user.name,
        });
        this.props.onSuccess(json.user);
        if (this.props.onSignedIn) this.props.onSignedIn(json.user);
      } else {
        const errors = json.errors ? json.errors : {};
        errors.summary = json.message;
        this.setState({
          errors,
        });
      }
    });
  }

  changeUser(event) {
    const field = event.target.name;
    const { user } = this.state;

    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  /**
   * Render the component.
   */
  render() {
    if (!this.state.success) {
      return (
        <div>
          <Row>
            <LoginForm
              onSubmit={this.processForm}
              onChange={this.changeUser}
              errors={this.state.errors}
              user={this.state.user}
            />
          </Row>
          <Row>
            <center>
              <h3>Or</h3>
              <TwitterLogin
                tag='div'
                bsStyle='primary'
                loginUrl='http://localhost:3000/auth/twitter/verify'
                onFailure={this.onFailed}
                onSuccess={this.onSuccess}
                requestTokenUrl='http://localhost:3000/auth/twitter/reverse'
              >
                <TwitterButton>Login with Twitter</TwitterButton>
              </TwitterLogin>
            </center>
          </Row>
        </div>
      );
    }
    return <TimeoutRedirectedPage timeout='2000' component={<Alert bsStyle='success'>Hello {this.state.username}! You have successfully logged in!</Alert>} to='/' />;
  }
}

export default Login;
