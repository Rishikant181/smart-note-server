/* This file containes various helper methods for authentication and authorization */

const jwt = require('jsonwebtoken');

const config = require('../config/env.json');

// Method to generate a json web token and authorize user after authentication
function generateJWT(email) {
    // Initialising user object
    const user = {
        email: email
    };

    // Creating an authorization token and returning it
    return jwt.sign(user, config['jwt']['PRIVATE_KEY']);
}

// Method to authenticate auth token received from client
function authorizeToken(req, res, next) {
    // Getting authorization token from request
    const authorizationToken = req.headers['Authorization'] ? req.headers['Authorization'].split()[1] : null;

    // Verifying authorization token
    // If authoriztion token is present
    if(authorizationToken) {
        jwt.verify(authorizationToken, config['jwt']['PRIVATE_KEY'], (err, user) => {
            // If invalid token, sending 'Forbidden' response
            if(err) {
                return res.sendStatus(403);
            }
            // Else adding the credential id to request
            else {
                req.user = user;    
            }
            // Moving on with request
            next();
        });
    }
    // Else sending 'Forbidden' response
    else {
        res.sendStatus(403);
    }
}

module.exports.generateJWT = generateJWT;
module.exports.authorizeToken = authorizeToken;