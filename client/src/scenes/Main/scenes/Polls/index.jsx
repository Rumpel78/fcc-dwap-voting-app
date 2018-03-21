import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PollsOverview from './scenes/PollsOverview';
import PollShow from './scenes/PollShow';
import PollCreate from './scenes/PollCreate';

const polls = ({ user }) => (
  <div>
    <br />
    <Switch>
      <Route exact path='/polls/create' component={PollCreate} />
      <Route exact path='/polls' render={() => <PollsOverview user={user} />} />
      <Route path='/polls/:id' render={props => <PollShow user={user} {...props} />} />
    </Switch>
  </div>
);

export default polls;
