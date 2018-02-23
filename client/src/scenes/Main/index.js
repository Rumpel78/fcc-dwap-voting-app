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
import PollsOverview from './scenes/Polls/scenes/PollsOverview';
import OnlyForAuth from './scenes/OnlyForAuthTestPage';
import Login from './scenes/Login';
import Register from './scenes/Register';
import Polls from './scenes/Polls';
import './style.css';

const AuthFilter = Authorization([ 'manger', 'admin' ]);

class Main extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <TopNavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/docs' component={Docs} />
            <Route exact path='/polls' component={PollsOverview} />
            <Route exact path='/login' render={() => <Login onSuccess={this.userLoggedIn} />} />
            <Route exact path='/onlyForAuth' component={AuthFilter(OnlyForAuth)} />
            <Route exact path='/logout' component={LogOut} />
            <Route exact path='/signup' component={Register} />
            <Route path='/polls' components={Polls} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>);
  }
}

export default Main;
