import 'whatwg-fetch';
import React from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const { user } = this.state;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // fetch response
    fetch('/auth/signup', { method: 'POST', body: formData }).then((response) => {
      if (response.status === 200) {
        this.setState({ errors: {} });
      }
      return response.json();
    }).then((json) => {
      const errors = json.errors ? json.errors : {};
      errors.summary = json.message;
      this.setState({
        errors,
      });
    });
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default SignUpPage;
