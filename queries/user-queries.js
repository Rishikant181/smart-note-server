const {
    UserCredential
} = require('../types/user-type');

const {
    Response
} = require('../types/http');

const { verifyUserCredentials } = require('../database/user_credentials');

// To verify login credentials
const login = {
    type: Response,
    args: {
        cred: { type: UserCredential }
    },
    resolve: (parent, args) => verifyUserCredentials(args.cred)
}

module.exports.login = login;