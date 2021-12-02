/* This file contains various methods for querying the user_credentials collections */

const { MongoClient } = require('mongodb');

const config = require('../config/env.json');

// Method to add a new user
async function addUser(firstName, lastName, email, pass) {
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

    // Getting the collection to insert credentials into
    const collection = mongoClient.db(config['db_name']).collection(config['collections']['user_credentials']);

    // Executing query to add a new user's credentials
    const response = await collection.insertOne({
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: pass
    });

    // Evaluating response
    // If sucessfull
    if(response['acknowledged']) {
        return {
            signup: true,
            message: 'Signup was sucessfull'
        };
    }
    // If failed
    else {
        return {
            signup: false,
            message: 'Signup failed!'
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
            login: true,
            message: "Login sucessfull"
        };
    }
    // If invalid password
    else {
        return {
            login: false,
            message: "Account does not exist!"
        };
    }
}

module.exports.addUser = addUser;
module.exports.verifyUserCredentials = verifyUserCredentials;