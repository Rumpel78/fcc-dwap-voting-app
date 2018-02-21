import { Redirect } from 'react-router-dom';
import React from 'react';
import Auth from '../../../../services/Auth';

// Authorization HOC
const Authorization = allowedRoles => WrappedComponent => () => {
  if (Auth.isUserAuthenticated()) {
    return <WrappedComponent {...this.props} />;
  }
  return <Redirect path='*' to='/login' />;
};

export default Authorization;
