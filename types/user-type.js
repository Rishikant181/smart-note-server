/* This file contains various type definitions related to users */

const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

// To store input user credentials
const UserCredential = new GraphQLInputObjectType({
    name: 'UserCredential',
    description: 'To store the credentials of a user',
    fields: () => ({
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) }
    })
});

// To store the new account details
const NewAccountDetails = new GraphQLInputObjectType({
    name: 'NewAccountDetails',
    description: 'To store the new account details of user',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLInt }
    })
});

module.exports.UserCredential = UserCredential;
module.exports.NewAccountDetails = NewAccountDetails;