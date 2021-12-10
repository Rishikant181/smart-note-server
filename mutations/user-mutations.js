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
const { NewAccountDetails } = require('../types/user-type');

// To add the new user's credentials to db
const signup = {
    type: Response,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => addUserCredentials(args.email, args.pass)
}

// To update the user's account details to new ones
const updateDetails = {
    type: Response,
    args: {
        email: { type: GraphQLString },
        details: { type: NewAccountDetails }
    },
    resolve: (parent, args) => updateAccountDetails(args.email, args.details)
}

module.exports.signup = signup;
module.exports.updateDetails = updateDetails;