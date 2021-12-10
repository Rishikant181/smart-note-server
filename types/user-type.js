/* This file contains various type definitions related to users */

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

// To store actual user credentials
const UserCredential = new GraphQLObjectType({
    name: 'UserCredential',
    description: 'To store the credentials of a user',
    fields: () => ({
        email: {type: GraphQLNonNull(GraphQLString) },
        pass: {type: GraphQLNonNull(GraphQLString) },
    })
});

module.exports.UserCredential = UserCredential;