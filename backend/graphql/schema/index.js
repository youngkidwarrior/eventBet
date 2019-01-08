const { buildSchema } = require('graphql');

///////////////////////////////////////////////////////////////////////////
///   Schema Notes:                                                     ///
///     - Input types and query types are seperate                      ///
///     - ! is required, notice password is not required                ///
///        for the query because password should never be returned      ///
///     - Layout                                                        ///
///         User -> Events                                               ///
///////////////////////////////////////////////////////////////////////////
module.exports = buildSchema(`
    
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
            creator: User!
        }

        type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
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
        `
        );
