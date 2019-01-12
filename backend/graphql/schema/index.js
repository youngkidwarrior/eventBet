const { buildSchema } = require('graphql');

///////////////////////////////////////////////////////////////////////////
///   Schema Notes:                                                     ///
///     - Input types and query types are seperate                      ///
///     - ! is required, notice password is not required                ///
///        for the query because password should never be returned      ///
///     - Layout                                                        ///
///         User -> one to many -> Events                               ///
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

        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updateAt: String!
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
            bookings: [Booking!]!
        }

        type rootMutation {
            createEvent(eventInput: EventInput): Event 
            createUser(userInput: UserInput): User
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
        }

        schema {
            query: rootQuery
            mutation: rootMutation
        }
    `);
