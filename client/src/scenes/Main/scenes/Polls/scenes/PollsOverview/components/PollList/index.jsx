/* eslint no-underscore-dangle: 0 */

import React from 'react';
import PollListItem from './components/PollListItem';

const PollList = props => (
  <div>
    { props.polls && props.polls.map(item => <PollListItem key={item._id} poll={item} />) }
  </div>
);

export default PollList;
