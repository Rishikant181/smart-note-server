/* This file contains various methods for querying the user_credentials collection */

const { MongoClient } = require('mongodb');

const config = require('../config/env.json');

// Method to add a new user
async function addUserCredentials(firstName, lastName, email, pass) {
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
        uid: (await collection.find().toArray()).length,
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: pass
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
async function verifyUserCredentials(email, pass) {
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
        email: email
    });

    // Evaluating response
    // If password valid
    if(response && response['pass'] === pass) {
        return {
            success: true,
            type: 'LoginSuccess',
            details: '',
            data: {}
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

module.exports.addUserCredentials = addUserCredentials;
module.exports.verifyUserCredentials = verifyUserCredentials;