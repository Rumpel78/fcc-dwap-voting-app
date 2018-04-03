import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Welcome = ({ user }) => (
  <div align="center">
    <h1>{ user && `${capitalizeFirstLetter(user.username)}, ` }Welcome {user && 'back'} to VoteHub!</h1>
    <h3>
      Build, share and vote on polls!
    </h3>
    <br />
    <br />
    <Link to="/polls"><Button bsSize="large" bsStyle="success">Take me to the polls!</Button></Link>
  </div>
);

export default Welcome;
