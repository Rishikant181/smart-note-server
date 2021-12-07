/* This file contains various types for passing data through http */

const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString
} = require('graphql');

const { ScalarJSON } = require('./custom');

// To store the reponse to be sent
const Response = new GraphQLObjectType({
    name: 'Response',
    description: 'To store the response to be sent for http communicaton',
    fields: () => ({
        success: { type: GraphQLBoolean },                                      // To store success failure code
        type: { type: GraphQLString },                                          // To store the type of response
        details: { type: GraphQLString },                                       // To store additional details
        data: { type: ScalarJSON }                                              // To store additional data
    })
});

module.exports.Response = Response;