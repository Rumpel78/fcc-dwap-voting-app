import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import React from 'react';

import TopNavBar from './components/TopNavBar';
import LogOut from './components/LogOut';
import Home from './scenes/Home';
import NotFound from './scenes/NotFound';
import Login from './scenes/Login';
import Polls from './scenes/Polls';
import Auth from '../../services/Auth';

import './style.css';

class Main extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    Auth.getUser((user) => {
      this.setState({ user });
    });
  }

  logout = () => {
    Auth.deauthenticateUser();
  };

  userLoggedIn = (user) => {
    this.setState({ user });
  }

  userLoggedOut = () => {
    this.setState({ user: null });
  }

  render() {
    return (
      <div>
        <Grid>
          <TopNavBar />
          <Switch>
            <Route exact path='/' render={() => <Home user={this.state.user} />} />
            <Route path='/polls' render={() => <Polls user={this.state.user} />} />
            <Route exact path='/login' render={() => <Login onSuccess={this.userLoggedIn} />} />
            <Route exact path='/logout' render={() => <LogOut onSuccess={this.userLoggedOut} />} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>);
  }
}

export default Main;
