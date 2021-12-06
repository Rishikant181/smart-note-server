/* This file contains various methods for querying the user_account_details collection */

const { MongoClient } = require('mongodb');

const config = require('../config/env.json');

// Method to update user account details
async function updateAccountDetails(fistName, lastName, phone, pass) {
    
}

module.exports.updateAccountDetails = updateAccountDetails;