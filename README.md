## [FreeCodeCamp Dynamic Web Application Projects](https://www.freecodecamp.org) / [Build a Voting App](https://www.freecodecamp.org/challenges/build-a-voting-app)

* **Objective**: Build a full stack JavaScript app that is functionally similar to this: https://fcc-voting-arthow4n.herokuapp.com/ and deploy it to Heroku.
* **User Story**: As an authenticated user, I can keep my polls and come back later to access them.
* **User Story**: As an authenticated user, I can share my polls with my friends.
* **User Story**: As an authenticated user, I can see the aggregate results of my polls.
* **User Story**: As an authenticated user, I can delete polls that I decide I don't want anymore.
* **User Story**: As an authenticated user, I can create a poll with any number of possible items.
* **User Story**: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* **User Story**: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)
* **User Story**: As an authenticated user, if I don't like the options on a poll, I can create a new option.

**Find a demo under: https://dwap.app.rzipa.at**

### How to build this project

Easiest way to build and run this app is to use **docker-compose**:

Prepare installation:
* Create twitter app on https://apps.twitter.com/ - enter all requested information. Callback URL can be anything, but must be entered
* Clone this repository `git clone https://github.com/Rumpel78/fcc-dwap-voting-app.git`
* Create docker-compose.yml `vim docker-compose.yml`
* Enter a jwt secret (15 chars)
* Fill in you Twitter Consumer Key and Consumer Secret
* Start container with `docker-compose up -d`
* Open browser on http://localhost:8080
* To stop enter `docker-compose down`

Sample docker-compose.yml:
```
version: '2'

services:
  fcc-dwap-voting-app:
    build:
      context: ./fcc-dwap-voting-app
    restart: always
    environment:
      - "NODE_ENV=production"
      - "PORT=8080"
      - "DB_HOST=mongo"
      - "JWT_SECRET=your jwt secret"
      - "TWITTER_CONSUMER_KEY=your twitter consumer key"
      - "TWITTER_CONSUMER_SECRET=your twitter consumer secret"
    ports:
      - "8080:8080"
    depends_on:
      - mongo

  mongo:
    image: mongo
    restart: always
```



### This project uses
 
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