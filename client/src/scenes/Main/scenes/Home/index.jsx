import React from 'react';

const Welcome = ({ user }) => (
  <h1>Welcome to React { user && user.username }</h1>
);

export default Welcome;
