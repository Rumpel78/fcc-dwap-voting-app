import * as React from 'react';
import { Button } from 'react-bootstrap';
import TwitterIcon from 'react-icons/lib/fa/twitter';

const LoginForm = (children: any) => ( // TODO: fix any
  <Button type='submit' bsStyle='default'><TwitterIcon color='#00aced' size={25} /> {children}</Button>
);

export default LoginForm;
