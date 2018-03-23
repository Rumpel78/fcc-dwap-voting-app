import React from 'react';
import ReactMarkdown from 'react-markdown';

const source = `
### [FreeCodeCamp Dynamic Web Application Projects](https://www.freecodecamp.org) / [Build a Voting App](https://www.freecodecamp.org/challenges/build-a-voting-app)

&nbsp;

* **Objective**: Build a full stack JavaScript app that is functionally similar to this: https://fcc-voting-arthow4n.herokuapp.com/ and deploy it to Heroku.
* **User Story**: As an authenticated user, I can keep my polls and come back later to access them.
* **User Story**: As an authenticated user, I can share my polls with my friends.
* **User Story**: As an authenticated user, I can see the aggregate results of my polls.
* **User Story**: As an authenticated user, I can delete polls that I decide I don't want anymore.
* **User Story**: As an authenticated user, I can create a poll with any number of possible items.
* **User Story**: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* **User Story**: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
* **User Story**: As an authenticated user, if I don't like the options on a poll, I can create a new option.

&nbsp;

#### This project uses
&nbsp;
 
**Frontend:**
* create-react-app
* react
* react-router
* react-bootstrap
* react-twitter-auth
* react-icons
* react-markdown
* recharts

**Backend:**
* ExpressJs
* MongoDb with mongoose
* passport local & twitter-auth-token
* jsonwebtoken

`;

const Welcome = ({ user }) => (
  <div>
    <h1>{ user && `${user.username}, ` }Welcome {user && 'back'} to VoteHub!</h1>
    <br />
    <br />
    <ReactMarkdown source={source} />
  </div>
);

export default Welcome;
