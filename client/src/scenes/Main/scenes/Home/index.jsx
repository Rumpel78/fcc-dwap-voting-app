import React from 'react';



const Welcome = ({ user }) => (
  <div>
    <h1>{ user && `${user.username}, ` }Welcome {user && 'back'} to VoteHub!</h1>
  </div>
);

export default Welcome;
