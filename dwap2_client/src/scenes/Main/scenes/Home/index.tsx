import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import User from '../../../../types/User';
import './index.css';

function capitalizeFirstLetter(content: string) {
  return content.charAt(0).toUpperCase() + content.slice(1);
}

const Welcome = (user: User) => (
  <div>
    <h1>{user && `${capitalizeFirstLetter(user.Username)}, `}Welcome {user && 'back'} to VoteHub!</h1>
    <h3>
      Build, share and vote on polls!
    </h3>
    <br />
    <br />
    <Link to="/polls"><Button bsSize="large" bsStyle="success">Take me to the polls!</Button></Link>
  </div>
);

export default Welcome;
