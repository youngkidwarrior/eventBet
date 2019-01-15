const { buildSchema } = require('graphql');

///////////////////////////////////////////////////////////////////////////
///   Schema Notes:                                                     ///
///     - Input types and query types are seperate                      ///
///     - ! is required, notice password is not required                ///
///        for the query because password should never be returned      ///
///     - Layout                                                        ///
///         User -> one to many -> Events                               ///
///         Events -> one to many -> Booking                            ///
///         User -> one to many -> Booking                              ///
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
            address: String!
        }

        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
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
            address: String!
            nonce: String!
            createdEvents: [Event!]
        }

        type AuthData {
            userId: ID!
            nonce: String!
            token: String!
            tokenExpiration: Int!
        }

        type rootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            login(email: String!, address: String!): User
            verify(address: String!, signature: String!): AuthData
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
