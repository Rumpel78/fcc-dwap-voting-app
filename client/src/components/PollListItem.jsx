// src/components/NotFound/index.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PollListItem = props => (
  <p>{props.poll.name} {props.poll.createdBy}  <Link to={`/poll/${props.poll._id}`}><Button>Show</Button></Link> </p>
);

export default PollListItem;
