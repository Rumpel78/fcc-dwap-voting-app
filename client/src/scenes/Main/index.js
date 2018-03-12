import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import TwitterLogin from 'react-twitter-auth';

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
import User from '../../services/User';

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

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then((user) => {
      if (token) {
        this.setState({ isAuthenticated: true, user, token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null });
  };

  userLoggedIn(user) {
    this.setState({ user });
    User.saveUser(user);
  }

  userLoggedOut() {
    this.setState({ user: { name: 'Guest' } });
    User.removeUser();
  }
  render() {
    return (
      <div>
        <Grid>
          <TopNavBar />
          <TwitterLogin
            loginUrl="http://localhost:3000/auth/twitter"
            onFailure={this.onFailed}
            onSuccess={this.onSuccess}
            requestTokenUrl="http://localhost:3000/auth/twitter/reverse" />

          <p>Authenticated: {this.state.isAuthenticated}</p>
          <p>Username: {this.state.user && this.state.user.name}</p>
          <p>Token: {this.state.token}</p>
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
