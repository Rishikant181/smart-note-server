const {
    GraphQLNonNull,
    GraphQLString
} = require('graphql')

const {
    Response
} = require('../types/http');

const { addUser } = require('../database/user_credentials')

// To add the new user's credentials to db
const signup = {
    type: Response,
    args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        pass: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, args) => addUser(args.firstName, args.lastName, args.email, args.pass)
}

module.exports.signup = signup;