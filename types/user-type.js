/* This file contains various type definitions related to users */

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');

// To store the login result
const LoginResult = new GraphQLObjectType({
    name: 'LoginResult',
    description: 'To store the result of credentials verification',
    fields: {
        login: { type: GraphQLBoolean },
        message: { type: GraphQLString },
    }
});

// To store actual user credentials
const UserCredential = new GraphQLObjectType({
    name: 'UserCredential',
    description: 'To store the credentials of a user',
    fields: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        email: {type: GraphQLNonNull(GraphQLString) },
        pass: {type: GraphQLNonNull(GraphQLString) },
    }
});

module.exports.UserCredential = UserCredential;
module.exports.LoginResult = LoginResult;