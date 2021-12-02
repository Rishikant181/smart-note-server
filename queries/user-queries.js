const {
    GraphQLList, GraphQLString, GraphQLNonNull
} = require('graphql');

const {
    UserCredential
} = require('../types/user-type');

const {
    Response
} = require('../types/http');

const { verifyUserCredentials } = require('../database/user_credentials');

// *TESTING ONLY!* To get all credentials
const allCreds = {
    type: GraphQLList(UserCredential),
    resolve: () => (creds)
};

// To verify login credentials
const login = {
    type: Response,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => verifyUserCredentials(args.email, args.pass)
}

module.exports.allCreds = allCreds;
module.exports.login = login;