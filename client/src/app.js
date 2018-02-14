import { Nav, NavItem, Grid, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import Auth from './modules/Auth';

import Welcome from './components/Welcome';
import NotFound from './components/NotFound';
import About from './components/About';
import Docs from './components/Docs';
import OnlyForAuth from './components/OnlyForAuth';
import Logout from './components/Logout';
import LoggedInSplash from './components/LoggedInSplash';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import Authorization from './containers/Authorization';
import PollListPage from './containers/PollListPage';
import PollPage from './containers/PollPage';

import logo from './logo.svg';
import './style.css';

const AuthFilter = Authorization([ 'manger', 'admin' ]);

class App extends React.Component {
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
          <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'> <img src={logo} className='App-logo' alt='logo' />React App</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to='/about'><NavItem eventKey={1}>About</NavItem></LinkContainer>
                <LinkContainer to='/broken'><NavItem eventKey={2}>Broken</NavItem></LinkContainer>
                <LinkContainer to='/docs'><NavItem eventKey={2}>Docs</NavItem></LinkContainer>
                <LinkContainer to='/polls'><NavItem eventKey={2}>Polls</NavItem></LinkContainer>
                {Auth.isUserAuthenticated() && <LinkContainer to='/onlyForAuth'><NavItem eventKey={2}>Secret</NavItem></LinkContainer>}
              </Nav>
              <Nav pullRight>
                {Auth.isUserAuthenticated() && <LinkContainer to='/logout'><NavItem eventKey={3}>Logout</NavItem></LinkContainer>}
                {!Auth.isUserAuthenticated() && <LinkContainer to='/login'><NavItem eventKey={3}>Login</NavItem></LinkContainer>}
                <LinkContainer to='/signup'><NavItem eventKey={3}>SignUp</NavItem></LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path='/' render={() => <Welcome user={this.state.user} />} />
            <Route exact path='/about' component={About} />
            <Route exact path='/docs' component={Docs} />
            <Route exact path='/polls' component={PollListPage} />
            <Route exact path='/onlyForAuth' component={AuthFilter(OnlyForAuth)} />
            <Route exact path='/login' render={() => <LoginPage onSuccess={this.userLoggedIn} />} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/loggedinsplash' component={LoggedInSplash} />
            <Route path='/poll' components={PollPage} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>);
  }
}

export default App;
