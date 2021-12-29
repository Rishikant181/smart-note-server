/* This file contains various methods for querying the user_credentials collection */

const { MongoClient } = require('mongodb');

const config = require('../config/env.json');

const {
    updateAccountDetails
} = require('./user_account_details')

const {
    generateJWT
} = require('../helper/auth');

// Method to add a new user account
async function addUserAccount(cred, details) {
    // Adding user credentials
    credRes = await addUserCredentials(cred);

    console.log(cred);
    console.log(details);

    // Credentials added then adding account details
    if(credRes.success) {
        detailsRes = await updateAccountDetails(cred.email, details);

        // If details added
        if(detailsRes.success) {
            return {
                success: true,
                type: 'AccountCreated',
                data: {
                    authToken: generateJWT(cred)
                }
            };
        }
    }
    // If account creation failed 
    else {
        return {
            success: false,
            type: 'AccountCreationFailed',
            data: details
        };
    }
}

// Method to add a new user
async function addUserCredentials(cred) {
    // Creating a new connection to database
    const mongoClient = new MongoClient(config['mongo_uri']);

    // Connecting
    try {
        mongoClient.connect();
    }
    // If error connecting to db
    catch(err) {
        console.log("Failed connecting to MongoDB");
        console.log("Error: ");
        console.log(err);
    }

    // Getting the collection to insert credentials into
    const collection = mongoClient.db(config['db_name']).collection(config['collections']['user_credentials']);

    // Initialising the data to insert
    const data = {
        email: cred.email,
        pass: cred.pass
    };
    
    // Executing query to add a new user's credentials
    const response = await collection.insertOne(data);

    // Evaluating response
    // If sucessfull
    if(response['acknowledged']) {
        return {
            success: true,
            type: 'SignupSucessful',
            details: '',
            data: data
        };
    }
    // If failed
    else {
        return {
            success: true,
            type: 'SignupFailed',
            details: '',
            data: data
        };
    }    
}

// Method to fetch user password for credential verification
async function verifyUserCredentials(cred) {
    // Creating a new connection to database
    const mongoClient = new MongoClient(config['mongo_uri']);

    // Connecting
    try {
        mongoClient.connect();
    }
    // If error connecting to db
    catch(exception) {
        console.log("Failed connecting to MongoDB");
        console.log("Error: ");
        console.log(exception);
    }

    // Getting the collection to get password from
    const collection = mongoClient.db(config['db_name']).collection(config['collections']['user_credentials']);

    // Executing query to get user password
    const response = await collection.findOne({
        email: cred.email
    });

    // Evaluating response
    // If password valid
    if(response && response['pass'] === cred.pass) {
        return {
            success: true,
            type: 'LoginSuccess',
            details: '',
            data: {
                authorizationToken: generateJWT(cred.email)
            }
        };
    }
    // If invalid password
    else {
        return {
            success: false,
            type: 'AccountNotFound',
            details: '',
            data: {}
        };
    }
}

module.exports.addUserAccount = addUserAccount;
module.exports.addUserCredentials = addUserCredentials;
module.exports.verifyUserCredentials = verifyUserCredentials;