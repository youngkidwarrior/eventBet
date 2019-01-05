const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const ipfsAPI = require('ipfs-api');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');


const events = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
      
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type rootQuery {
        events: [Event!]!
      }
      
      type rootMutation {
        createEvent(eventInput: EventInput!): Event 
      }

      schema {
        query: rootQuery
        mutation: rootMutation
      }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        }
        events.push(event);
        console.log(args)
        return event;
      }
    },
    graphiql: true
  })
);

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

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.io', '5001', { protocol: 'https' });

//Reading file from computer
let testFile = { test: 'test2', user: 'userData' };
//Creating buffer for ipfs function to add file to the system
let testBuffer = new Buffer(JSON.stringify(testFile));

//Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {
  ipfs.files.add(testBuffer, function(err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file);
  });
});
//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
  //This hash is returned hash of addFile router.
  const validCID = 'QmZnQMfkSa3tpZJ78NMak4LeZ17B6S8DHkPJYU478mrBPQ';

  ipfs.files.get(validCID, function(err, files) {
    files.forEach(file => {
      console.log(file.path);
      console.log(file.content.toString('utf8'));
    });
  });
});

app.get('/publish', function(req, res) {
  ipfs.name.publish('QmZnQMfkSa3tpZJ78NMak4LeZ17B6S8DHkPJYU478mrBPQ', res => {
    console.log(res);
  });
});
module.exports = app;
