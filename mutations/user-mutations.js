const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql')

const {
    Response
} = require('../types/http');

const { addUserCredentials } = require('../database/user_credentials')

// To add the new user's credentials to db
const signup = {
    type: Response,
    args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => addUserCredentials(args.firstName, args.lastName, args.email, args.pass)
}

// To update the user's account details to new ones
const update = {
    type: Response,
    args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLInt },
        pass: { type: GraphQLString },
    },
    resolve: (parent, args) => updateAccountDetails(args.firstName, args.lastName, args.phone, args.pass)
}

module.exports.signup = signup;