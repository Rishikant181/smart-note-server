const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const { config } = require('./config/env.json');
const { authorizeToken } = require('./helper/auth');
const { RootQuery } = require('./queries/root');
const { RootMutation } = require('./mutations/root');

const app = express();

// Initialising the schema
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

// Using cors
app.use(cors());

// Adding token authorization middleware
// app.use(authorizeToken);

// Adding graphql middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));