const {
    UserSignupCredential,
    SignupResult
} = require('../types/user-type');

const { addUser } = require('../database/user_credentials')

// To add the new user's credentials to db
const signup = {
    type: SignupResult,
    args: {
        creds: { type: UserSignupCredential },
    },
    resolve: (parent, args) => addUser(args.creds.firstName, args.creds.lastName, args.creds.email, args.creds.pass)
}

module.exports.signup = signup;