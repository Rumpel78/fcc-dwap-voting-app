import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PollsOverview from './scenes/PollsOverview';
import PollShow from './scenes/PollShow';
import PollCreate from './scenes/PollCreate';

const polls = ({ user }) => (
  <div>
    <br />
    <Switch>
      <Route exact path='/polls/create' render={() => <PollCreate user={user} />} />
      <Route exact path='/polls' component={PollsOverview} />
      <Route path='/polls/:id' component={PollShow} />
    </Switch>
  </div>
);

export default polls;
