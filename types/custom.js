/* This file contains various custom scalar types */

const {
    GraphQLScalarType,
    valueFromAST,
    parseValue
} = require('graphql');

// For storing the data to return in response
const ScalarJSON = new GraphQLScalarType({
    name: 'Data',
    description: 'To store the data to send back in response',
    serialize(data) {
        return data;
    },
    parseValue(data) {
        return data;
    },
});

module.exports.ScalarJSON = ScalarJSON;