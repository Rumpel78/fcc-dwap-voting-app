import { Button } from 'react-bootstrap';
import React from 'react';

const LoginForm = ({ children }) => (
  <Button type='submit' bsStyle='primary'>{children}</Button>
);

export default LoginForm;
