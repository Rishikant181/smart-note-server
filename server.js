const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const { RootQuery } = require('./queries/root');
const { RootMutation } = require('./mutations/mutations');

const app = express();

// Initialising the schema
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

// Adding graphql middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

// Starting server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});