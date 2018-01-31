import React from 'react';
import Auth from '../modules/Auth';
import { Redirect } from 'react-router-dom';


// Authorization HOC
const Authorization = allowedRoles => WrappedComponent =>
  class WithAuthorization extends React.Component {
    render() {
      if (Auth.isUserAuthenticated()) {
        return <WrappedComponent {...this.props} />;
      }
      return <Redirect path="*" to="/login" />
    }
  };

export default Authorization;
