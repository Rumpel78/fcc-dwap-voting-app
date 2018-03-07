/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PollListItem = ({ poll }) => (
  <tr>
    <td>{poll.name}</td>
    <td>{poll.createdBy}</td>
    <td>{poll.options.length}</td>
    <td>
      <Link to={`/polls/${poll._id}`}><Button>Show</Button></Link>
      <Link to={`/polls/${poll._id}`}><Button>Delete</Button></Link>
    </td>
  </tr>
);

export default PollListItem;
