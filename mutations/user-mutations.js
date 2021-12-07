const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql')

const {
    Response
} = require('../types/http');

const { addUserCredentials } = require('../database/user_credentials');
const { updateAccountDetails } = require('../database/user_account_details');

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
const updateDetails = {
    type: Response,
    args: {
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLInt },
        pass: { type: GraphQLString },
    },
    resolve: (parent, args) => updateAccountDetails(args.email, args.firstName, args.lastName, args.phone, args.pass)
}

module.exports.signup = signup;
module.exports.updateDetails = updateDetails;