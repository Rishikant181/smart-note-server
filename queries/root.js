const {
    GraphQLObjectType
} = require('graphql');

const {
    allCreds,
    login
} = require('./user-queries');

// Initialising the root query
const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        login: login,
    })
})

module.exports.RootQuery = RootQuery;