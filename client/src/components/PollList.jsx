// src/components/NotFound/index.js
import React from 'react';
import PollListItem from './PollListItem';

const PollList = props => (
  <div>
    { props.polls && props.polls.map(item => <PollListItem key={item._id} poll={item} />) }
  </div>
);

export default PollList;
