import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = [ '#0088FE', '#00C49F', '#FFBB28', '#FF8042' ];

const PollPieChart = ({ poll }) => (
  <ResponsiveContainer height={500}>
    <PieChart >
      <Pie data={poll.options} dataKey='count' nameKey='name' cx='50%' cy='50%' innerRadius='20%' label>
        { poll.options && poll.options.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default PollPieChart;
