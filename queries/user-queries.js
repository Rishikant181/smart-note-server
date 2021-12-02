const {
    GraphQLList, GraphQLString, GraphQLNonNull
} = require('graphql');

const {
    UserCredential,
    LoginResult
} = require('../types/user-type');

const { verifyUserCredentials } = require('../database/user_credentials');

// *TESTING ONLY!* To get all credentials
const allCreds = {
    type: GraphQLList(UserCredential),
    resolve: () => (creds)
};

// To verify login credentials
const login = {
    type: LoginResult,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => verifyUserCredentials(args.email, args.pass)
}

module.exports.allCreds = allCreds;
module.exports.login = login;