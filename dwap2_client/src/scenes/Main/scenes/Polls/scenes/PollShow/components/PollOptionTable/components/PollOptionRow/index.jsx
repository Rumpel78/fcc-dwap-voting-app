import React from 'react';
import { Button } from 'react-bootstrap';

const PollOptionRow = ({ option, onVote, disabled }) => (
  <tr>
    <td>{option.name}</td>
    <td>{option.count}</td>
    <td><Button bsSize='small' bsStyle='success' onClick={() => onVote(option.name)} disabled={disabled} >Vote!</Button></td>
  </tr>
);

export default PollOptionRow;
