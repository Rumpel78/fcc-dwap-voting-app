/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Table } from 'react-bootstrap';
import PollListItem from './components/PollListItem';

const PollList = ({
  polls,
  onDelete,
  onShare,
  user,
}) => (
  <Table>
    <thead>
      <tr>
        <th>Poll Name</th>
        <th>Created By</th>
        <th>Options</th>
        <th>Total Votes</th>
        <th />
      </tr>
    </thead>
    <tbody>
      { polls && polls.map(item => <PollListItem key={item._id} poll={item} onDelete={onDelete} onShare={onShare} user={user} />) }
    </tbody>
  </Table>
);

export default PollList;
