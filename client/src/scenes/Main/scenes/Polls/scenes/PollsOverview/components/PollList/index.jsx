/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Table } from 'react-bootstrap';
import PollListItem from './components/PollListItem';

const PollList = props => (
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>Poll Name</th>
        <th>Created By</th>
        <th>Options</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { props.polls && props.polls.map(item => <PollListItem key={item._id} poll={item} />) }
    </tbody>
  </Table>
);

export default PollList;
