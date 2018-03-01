import React from 'react';
import { PieChart, Pie } from 'recharts';

const PollPieChart = poll => (
  <PieChart width={730} height={250}>
    <Pie data={poll.data} dataKey='value' nameKey='name' cx='50%' cy='50%' innerRadius={10} outerRadius={80} fill='#82ca9d' label />
  </PieChart>
);

export default PollPieChart;
