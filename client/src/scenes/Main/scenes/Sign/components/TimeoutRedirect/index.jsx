// src/components/About/index.js
import React from 'react';
import { Redirect } from 'react-router-dom';

class TimeoutRedirectedPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      redirect: false,
      timeout: props.timeout,
      component: props.component,
      to: props.to,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, this.state.timeout);
  }

  render() {
    if (!this.state.redirect) {
      return this.state.component;
    }
    return <Redirect to={this.state.to} />;
  }
}

export default TimeoutRedirectedPage;
