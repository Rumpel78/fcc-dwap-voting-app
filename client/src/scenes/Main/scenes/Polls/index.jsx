import React from 'react';
import { Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import PollsOverview from './scenes/PollsOverview';
import PollShow from './scenes/PollShow';

const polls = () => (
  <div>
    <Button>Create new poll</Button>
    <br />
    <Switch>
      <Route exact path='/polls' component={PollsOverview} />
      <Route path='/polls/:id' component={PollShow} />
    </Switch>
  </div>
);

export default polls;
