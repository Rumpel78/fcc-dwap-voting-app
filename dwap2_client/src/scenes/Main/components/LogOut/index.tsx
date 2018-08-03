import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../../../../services/Auth';

const Logout = (onSuccess: () => void) => {
  Auth.deauthenticateUser();
  onSuccess();
  return <Redirect path='*' to='/' />;
};

export default Logout;
