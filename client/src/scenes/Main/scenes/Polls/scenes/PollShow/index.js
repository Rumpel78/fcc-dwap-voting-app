import React from 'react';
import PollPieChart from './components/PollPieChart';
import PollApi from './services/PollApi';

const PollShow = props => (
  <div>
    <p>The Poll nr <strong>{props.match.params.id}</strong></p>
    { PollApi }
    <PollPieChart poll={props.poll} />
  </div>
);

export default PollShow;
