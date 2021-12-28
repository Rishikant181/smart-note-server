/* This file contains various methods for querying the user_account_details collection */

const { MongoClient } = require('mongodb');

const config = require('../config/env.json');

// Method to update user account details
async function updateAccountDetails(email, details) {
    // Variable declaration
    var response = {};                                                       // To store the response received from MongoDB

    // Creating a new conenction to database
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

    // Getting the collection to update account details from
    const collection = mongoClient.db(config['db_name']).collection(config['collections']['user_account_details']);

    // Initialising the data to update/insert
    const data = {
        email: email,
        firstName: details.firstName,
        lastName: details.lastName
    };
    
    // Checking if account exists
    // If account already exists, then updating
    if(await collection.findOne({ email: email })) {
        response = await collection.updateOne({ email: email }, { $set: data});
    }
    // Else, adding
    else {
        response = await collection.insertOne(data);
    }

    // Evaluating response
    // If update successfull
    if(response['acknowledged']) {
        return {
            success: true,
            type: 'AccountUpdated',
            details: '',
            data: data
        }
    }
    // If failed
    else {
        return {
            success: true,
            type: 'AccountUpdateFailed',
            details: '',
            data: data
        }
    }
}

module.exports.updateAccountDetails = updateAccountDetails;