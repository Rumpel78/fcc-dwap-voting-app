// src/components/About/index.js
import * as React from 'react';
import { Redirect } from 'react-router-dom';

class TimeoutRedirectedPage extends React.Component {
  private mounted: boolean;
  private timeout: number;

  constructor(props: any) { // TODO: fix any
    super(props);

    this.mounted = false;

    // set the initial component state
    this.state = {
      component: props.component,
      redirect: false,
      timeout: props.timeout,
      to: props.to,
    };
    this.timeout = setTimeout(() => {
      if (this.mounted) { this.setState({ redirect: true }); }
    }, this.state.timeout);
  }

  public componentDidMount() {
    this.mounted = true;
  }

  public componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.timeout);
  }

  public render() {
    if (!this.state.redirect) {
      return this.state.component;
    }
    return <Redirect to={this.state.to} />;
  }
}

export default TimeoutRedirectedPage;
