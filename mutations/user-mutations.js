const {
    GraphQLString,
} = require('graphql')

const {
    Response
} = require('../types/http');

const { addUserCredentials } = require('../database/user_credentials');
const { updateAccountDetails } = require('../database/user_account_details');

const {
    NewAccountDetails,
    UserCredential
} = require('../types/user-type');

// To add the new user's credentials to db
const signup = {
    type: Response,
    args: {
        cred: { type: UserCredential }
    },
    resolve: (parent, args) => addUserCredentials(args.cred)
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