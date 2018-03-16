import { Button } from 'react-bootstrap';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import React from 'react';

const LoginForm = ({ children }) => (
  <Button type='submit' bsStyle='default'><TwitterIcon color='#00aced' size={25}/> {children}</Button>
);

export default LoginForm;
