import * as React from 'react';
import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import Auth from '../../services/Auth';
import LogOut from './components/LogOut';
import TopNavBar from './components/TopNavBar';
import About from './scenes/About';
import Home from './scenes/Home';
import Login from './scenes/Login';
import NotFound from './scenes/NotFound';
import Polls from './scenes/Polls';

import User from '../../types/User';
import './style.css';

class Main extends React.Component {
  constructor(props: any) {
    super(props);

    // set the initial component state
    this.state = {
      user: null,
    };
  }

  public componentDidMount() {
    Auth.getUser((user) => {
      this.setState({ user });
    });
  }

  public render() {
    return (
      <div>
        <Grid>
          <TopNavBar />
          <Switch>
            <Route exact={true} path='/' render={() => <Home user={this.state.user} />} />
            <Route path='/about' component={About} />
            <Route path='/polls' render={() => <Polls user={this.state.user} />} />
            <Route exact={true} path='/login' render={() => <Login onSuccess={this.userLoggedIn} />} />
            <Route exact={true} path='/logout' render={() => <LogOut onSuccess={this.userLoggedOut} />} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>);
  }

  private logout = () => {
    Auth.deauthenticateUser();
  };

  private userLoggedIn = (user: User) => {
    this.setState({ user });
  }

  private userLoggedOut = () => {
    this.setState({ user: null });
  }
}

export default Main;
