const {
    GraphQLObjectType
} = require('graphql');

const {
    signup
} = require('./user-mutations');

// Initialising the root mutation
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        signup: signup,
    })
})

module.exports.RootMutation = RootMutation;