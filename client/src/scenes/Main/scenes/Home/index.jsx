import React from 'react';
import { connect } from 'react-redux';

const Welcome = ({ name }) => (
  <h1>Welcome to React { name }</h1>
);

const mapStateToProps = store => (
  {
    name: store.user.name,
  });


export default connect(mapStateToProps)(Welcome);
