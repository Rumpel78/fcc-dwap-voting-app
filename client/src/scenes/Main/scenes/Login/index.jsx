import 'whatwg-fetch';
import React from 'react';
import { Alert, Row } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import TimeoutRedirectedPage from './components/TimeoutRedirect';
import Auth from '../../../../services/Auth';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        password: '',
      },
      success: false,
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  onSignIn() {
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);

    Auth.login(username, password, (json) => {
      if (json.success) {
        this.loginSuccess(json.user, json.token);
      } else {
        const errors = json.errors ? json.errors : {};
        errors.summary = json.message;
        this.setState({
          errors,
        });
      }
    });
  }

  onRegister() {
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);

    Auth.register(username, password, (json) => {
      if (json.success) {
        this.loginSuccess(json.user, json.token);
      } else {
        const errors = json.errors ? json.errors : {};
        errors.summary = json.message;
        this.setState({
          errors,
        });
      }
    });
  }

  loginSuccess(user) {
    this.setState({
      success: true,
      user: { username: user.username },
    });
    if (this.props.onSuccess) this.props.onSuccess(user);
  }

  changeUser(event) {
    const field = event.target.name;
    const { user } = this.state;

    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  twitterSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    Auth.authenticateUser(token);
    response.json().then((user) => {
      this.loginSuccess(user, token);
    });
  };

  twitterFailed = () => {
    const errors = {
      summary: 'Failed to login with twitter',
    };
    this.setState({ errors });
  };

  /**
   * Render the component.
   */
  render() {
    if (!this.state.success) {
      return (
        <div>
          <Row>
            <LoginForm
              onSignIn={this.onSignIn}
              onRegister={this.onRegister}
              onChange={this.changeUser}
              twitterFailed={this.twitterFailed}
              twitterSuccess={this.twitterSuccess}
              errors={this.state.errors}
              user={this.state.user}
            />
          </Row>
        </div>
      );
    }
    return <TimeoutRedirectedPage timeout='2000' component={<Alert bsStyle='success'>Hello {this.state.username}! You have successfully logged in!</Alert>} to='/' />;
  }
}

export default Login;
