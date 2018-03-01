import { Redirect } from 'react-router-dom';
import React from 'react';
import Auth from '../../../../services/Auth';

const Logout = (props) => {
  Auth.deauthenticateUser();
  props.onSuccess();
  return <Redirect path='*' to='/' />;
};

export default Logout;
