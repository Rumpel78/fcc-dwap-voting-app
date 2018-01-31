import { Jumbotron, Button } from 'react-bootstrap';
import React from 'react';

const Docs = () => (
  <Jumbotron>
    <Button
      bsStyle='success'
      bsSize='large'
      href='http://react-bootstrap.github.io/components.html'
      target='_blank'
    >
      View React Bootstrap Docs
    </Button>
  </Jumbotron>
);

export default Docs;
