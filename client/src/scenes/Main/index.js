import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import React from 'react';

import TopNavBar from './components/TopNavBar';
import LogOut from './components/LogOut';
import Authorization from './components/Authorization';
import Home from './scenes/Home';
import NotFound from './scenes/NotFound';
import About from './scenes/About';
import Docs from './scenes/Docs';
import OnlyForAuth from './scenes/OnlyForAuthTestPage';
import Login from './scenes/Login';
import Register from './scenes/Register';
import Polls from './scenes/Polls';
import Auth from '../../services/Auth';

import './style.css';

const AuthFilter = Authorization([ 'manger', 'admin' ]);

class Main extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      user: { isAuthenticated: false, user: null, token: '' },
    };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.userLoggedOut = this.userLoggedOut.bind(this);
  }

  componentDidMount() {
    Auth.getUser((user) => {
      this.setState({ user });
    });
  }

  logout = () => {
    Auth.deauthenticateUser();
  };

  userLoggedIn(user) {
    this.setState({ user });
  }

  userLoggedOut() {
    this.setState({ user: null });
  }

  render() {
    return (
      <div>
        <Grid>
          <TopNavBar />
          <p>Username: {this.state.user && this.state.user.username}</p>
          <Switch>
            <Route exact path='/' render={() => <Home user={this.state.user} />} />
            <Route exact path='/about' component={About} />
            <Route exact path='/docs' component={Docs} />
            <Route path='/polls' render={() => <Polls user={this.state.user} />} />
            <Route exact path='/login' render={() => <Login onSuccess={this.userLoggedIn} />} />
            <Route exact path='/onlyForAuth' component={AuthFilter(OnlyForAuth)} />
            <Route exact path='/logout' render={() => <LogOut onSuccess={this.userLoggedOut} />} />
            <Route exact path='/signup' component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>);
  }
}

export default Main;
