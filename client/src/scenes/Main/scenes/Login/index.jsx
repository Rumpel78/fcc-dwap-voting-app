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

    Auth.login(email, password, (json) => {
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

  loginSuccess(user) {
    this.setState({
      success: true,
      username: user.name,
    });
    this.props.onSuccess(user);
    if (this.props.onSignedIn) this.props.onSignedIn(user);
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
    response.json().then((user) => {
      this.loginSuccess(user);
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
              onSubmit={this.processForm}
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
