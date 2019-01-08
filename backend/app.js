const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//////////////////////////////////////////////////////////////////////////
///   Schema Notes
//////////////////////////////////////////////////////////////////////////

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    
      input EventInput {
        title: String! 
        description: String!
        price: Float!
        date: String!
      }

      input UserInput {
        email: String!
        password: String!
      }
        
      type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

      type User {
        _id: ID!
        email: String!
        password: String
      }

      type rootQuery {
        events: [Event!]!
        users: [User!]!
      }
      
      type rootMutation {
        createEvent(eventInput: EventInput): Event 
        createUser(userInput: UserInput): User
      }

      schema {
        query: rootQuery
        mutation: rootMutation
      }
    `),
    rootValue: {
      users: () => {
        return User.find()
          .then(users => {
            return users.map(user => {
              return { ...user._doc, _id: user.id };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      events: () => {
        //static methods methods allowed to be called without changing data
        //Model.find() return specified model
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event.id };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        //Using mongoose model here allowing storage into
        //database with Model.save()
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "5c3436dc57a30c2ab0734536"
        });
        let createdEvent;
        return event
          .save()
          .then(result => {
            createdEvent = { ...result._doc, _id: result.id }
            return User.findById('5c3436dc57a30c2ab0734536')
            
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found.');
            }
            user.createdEvents.push(event)
            return user.save()
          })
          .then(result=> {
            console.log(result);
            return createdEvent;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error('User already exists.');
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
      }
    },
    graphiql: true
  })
);

///////////////////////////////
/// Mongo Cluster Connect   ///
///////////////////////////////

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-dgued.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(() => {
    console.log('Connection Failed');
  });

/////////////////////////////
///  CORS Gateway         ///
/////////////////////////////
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

module.exports = app;
