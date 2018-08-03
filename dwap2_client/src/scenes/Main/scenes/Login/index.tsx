import * as React from 'react';
import { Alert, Row } from 'react-bootstrap';
import 'whatwg-fetch';
import Auth from '../../../../services/Auth';
import LoginForm from './components/LoginForm';
import TimeoutRedirectedPage from './components/TimeoutRedirect';
import User from '../../../../types/User';

class Login extends React.Component {
  constructor(props: any) { // TODO: fix any
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      success: false,
      user: {
        Password: '',
        Username: '',
      },
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  private onSignIn() {
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

  private onRegister() {
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);

    Auth.register(username, password, (json) => {
      if (json.success) {
        this.loginSuccess(json.user);
      } else {
        const errors = json.errors ? json.errors : {};
        errors.summary = json.message;
        this.setState({
          errors,
        });
      }
    });
  }

  private loginSuccess(user: User) {
    this.setState({
      success: true,
      user: { username: user.Username },
    });
    if (this.props.onSuccess) this.props.onSuccess(user);
  }

  private changeUser(event) {
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
