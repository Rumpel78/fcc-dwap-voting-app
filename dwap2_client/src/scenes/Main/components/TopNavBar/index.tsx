import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../../../../services/Auth';
import logo from './logo.svg';

// const AuthFilter = Authorization([ 'manger', 'admin' ]);

const TopNavBar = () =>
  (
    <Navbar inverse={true} fixedTop={true}>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'> <img src={logo} className='App-logo' alt='logo' />VoteHub</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to='/about'><NavItem eventKey={1}>About</NavItem></LinkContainer>
          <LinkContainer to='/polls'><NavItem eventKey={2}>Polls</NavItem></LinkContainer>
          <NavItem eventKey={3} href='https://www.freecodecamp.org/challenges/build-a-voting-app' target='_blank'>Open freeCodeCamp</NavItem>
        </Nav>
        <Nav pullRight={true}>
          {Auth.isUserAuthenticated() && <LinkContainer to='/logout'><NavItem eventKey={4}>Logout</NavItem></LinkContainer>}
          {!Auth.isUserAuthenticated() && <LinkContainer to='/login'><NavItem eventKey={5}>Login / Register</NavItem></LinkContainer>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>);

export default TopNavBar;
