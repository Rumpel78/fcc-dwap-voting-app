import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import './logo.css';
import Auth from '../../../../services/Auth';

// const AuthFilter = Authorization([ 'manger', 'admin' ]);

const TopNavBar = () =>
  (
    <Navbar inverse fixedTop>
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
        <Nav pullRight>
          {Auth.isUserAuthenticated() && <LinkContainer to='/logout'><NavItem eventKey={4}>Logout</NavItem></LinkContainer>}
          {!Auth.isUserAuthenticated() && <LinkContainer to='/login'><NavItem eventKey={5}>Login / Register</NavItem></LinkContainer>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>);

export default TopNavBar;
