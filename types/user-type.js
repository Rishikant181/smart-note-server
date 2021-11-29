/* This file contains various type definitions related to users */

const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
} = require('graphql');

// To store the login result
const LoginResult = new GraphQLObjectType({
    name: 'LoginResult',
    description: 'To store the result of credentials verification',
    fields: () => ({
        login: { type: GraphQLBoolean },
        message: { type: GraphQLString },
    })
});

// To store the signup result
const SignupResult = new GraphQLObjectType({
    name: 'SignupResult',
    description: 'To store the result of signing up',
    fields: () => ({
        signup: { type: GraphQLBoolean },
        message: { type: GraphQLString },
    })
})

// To store actual user credentials
const UserCredential = new GraphQLObjectType({
    name: 'UserCredential',
    description: 'To store the credentials of a user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        email: {type: GraphQLNonNull(GraphQLString) },
        pass: {type: GraphQLNonNull(GraphQLString) },
    })
});

// To store the input credentials for creating a new account
const UserSignupCredential = new GraphQLInputObjectType({
    name: 'UserSignupCredential',
    description: 'To store the credentials used for creating a new account',
    fields: () => ({
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) },
    })
})

module.exports.LoginResult = LoginResult;
module.exports.SignupResult = SignupResult;
module.exports.UserCredential = UserCredential;
module.exports.UserSignupCredential = UserSignupCredential;