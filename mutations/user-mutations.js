const {
    UserSignupCredential,
    SignupResult
} = require('../types/user-type');

// To add the new user's credentials to db
const signup = {
    type: SignupResult,
    args: {
        creds: { type: UserSignupCredential },
    },
    resolve: () => ({
        signup: true,
        message: 'Signup was successful',
    }),
}

module.exports.signup = signup;