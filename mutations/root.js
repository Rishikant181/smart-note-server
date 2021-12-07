const {
    GraphQLObjectType
} = require('graphql');

const {
    signup,
    updateDetails
} = require('./user-mutations');

// Initialising the root mutation
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        signup: signup,
        updateDetails: updateDetails
    })
})

module.exports.RootMutation = RootMutation;