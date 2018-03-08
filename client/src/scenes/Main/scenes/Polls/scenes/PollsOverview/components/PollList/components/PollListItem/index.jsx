/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PollListItem = ({ poll, onDelete, user }) => (
  <tr>
    <td>{poll.name}</td>
    <td>{poll.createdBy}</td>
    <td>{poll.options.length}</td>
    <td>
      <ButtonToolbar>
        <Link to={`/polls/${poll._id}`}><Button bsStyle='primary'>Show</Button></Link>&nbsp;
        { (user.name === poll.createdBy) &&
          <Button bsStyle='danger' onClick={() => onDelete(poll._id)}>Delete</Button>
        }
      </ButtonToolbar>
    </td>
  </tr>
);

export default PollListItem;
