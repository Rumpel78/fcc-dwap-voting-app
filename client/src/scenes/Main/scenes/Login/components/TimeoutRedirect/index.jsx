// src/components/About/index.js
import React from 'react';
import { Redirect } from 'react-router-dom';

class TimeoutRedirectedPage extends React.Component {
  constructor(props) {
    super(props);

    this.mounted = false;

    // set the initial component state
    this.state = {
      redirect: false,
      timeout: props.timeout,
      component: props.component,
      to: props.to,
    };
    this.timeout = setTimeout(() => {
      if (this.mounted) this.setState({ redirect: true });
    }, this.state.timeout);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.timeout);
  }

  render() {
    if (!this.state.redirect) {
      return this.state.component;
    }
    return <Redirect to={this.state.to} />;
  }
}

export default TimeoutRedirectedPage;
