const {
    UserCredential
} = require('../types/user-type');

const {
    Response
} = require('../types/http');

const { loginUser } = require('../database/user_credentials');

// To verify login credentials
const login = {
    type: Response,
    args: {
        cred: { type: UserCredential }
    },
    resolve: (parent, args) => loginUser(args.cred)
}

module.exports.login = login;