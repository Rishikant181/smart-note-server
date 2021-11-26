/* This file contains the custom type for data related to users and accounting */

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');

// To store the credentials of the user
const UserCredentials = new GraphQLObjectType({
    name: 'UserCredentials',
    description: "This stores the credentials of a user",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) }
    })
})