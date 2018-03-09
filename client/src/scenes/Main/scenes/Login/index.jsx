import 'whatwg-fetch';
import React from 'react';
import { Alert } from 'react-bootstrap';
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
    const formData = `email=${email}&password=${password}`;

    fetch('/auth/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    }).then((response) => {
      if (response.status === 200) {
        this.setState({ errors: {} });
        return response.json();
      }
    }).then((json) => {
      if (json.success) {
        Auth.authenticateUser(json.token, json.user);
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
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
      );
    }
    return <TimeoutRedirectedPage timeout='2000' component={<Alert bsStyle='success'>Hello {this.state.username}! You have successfully logged in!</Alert>} to='/' />;
  }
}

export default Login;
