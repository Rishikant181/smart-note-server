const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
// const { MongoClient } = require('mongodb');

// const env = require('./config/env.json');
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

// Adding graphql middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

// Starting server
app.listen(3000, () => {
    console.log("Listening on port 3000");

    /*
    // Creating the mongo client
    const mongoClient = new MongoClient(env['mongo_uri']);

    // Connecting to db
    try {
        mongoClient.connect().then(() => {
            console.log("Connected to MongoDB");
        });
    }
    // If connection to database server fails
    catch(exception) {
        console.log("Unable to reach database server!");
    }
    */
});