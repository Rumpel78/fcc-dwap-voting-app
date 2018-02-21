import { Nav, NavItem, Grid, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';
// import Auth from '../../services/Auth';

import TopNavBar from './components/TopNavBar';
import Home from './scenes/Home';
import NotFound from './scenes/NotFound';
import About from './scenes/About';
import Docs from './scenes/Docs';
import PollsOverview from './scenes/Polls/scenes/PollsOverview';
// import OnlyForAuth from './components/OnlyForAuth';
// import Logout from './components/Logout';
// import LoggedInSplash from './components/LoggedInSplash';
// import LoginPage from './containers/LoginPage';
// import SignUpPage from './containers/SignUpPage';
// import Authorization from './containers/Authorization';
// import PollListPage from './containers/PollListPage';
// import PollPage from './containers/PollPage';

import './style.css';

// const AuthFilter = Authorization([ 'manger', 'admin' ]);

class Main extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      user: {},
    };
    this.userLoggedIn = this.userLoggedIn.bind(this);
  }

  userLoggedIn(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <Grid>
          <TopNavBar />
          <Switch>
            <Route exact path='/' render={() => <Home user={this.state.user} />} />
            <Route exact path='/about' component={About} />
            <Route exact path='/docs' component={Docs} />
            <Route exact path='/polls' component={PollsOverview} />
            {/* <Route exact path='/polls' component={PollListPage} />
            <Route exact path='/onlyForAuth' component={AuthFilter(OnlyForAuth)} />
            <Route exact path='/login' render={() => <LoginPage onSuccess={this.userLoggedIn} />} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/loggedinsplash' component={LoggedInSplash} />
            <Route path='/poll' components={PollPage} /> */}
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>);
  }
}

export default Main;
