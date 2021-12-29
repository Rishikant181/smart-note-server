const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const config = require('./config/env.json');
const { authorizeToken, generateJWT } = require('./helper/auth');
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

// To handle requst to app root to handle out guest authorization token
app.get('/', (req, res) => {
    // Generating authorization token for guest
    const authorizationToken = generateJWT({
        email: config['jwt']['guest_email'],
        pass: config['jwt']['guest_pass']
    });

    // Sending back guest token
    res.send({
        success: true,
        type: 'GuestAuthorized',
        data: {
            authorizationToken: authorizationToken
        }
    });
});

// Adding token authorization middleware
app.use(authorizeToken);

// Adding graphql middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Starting server
app.listen(config['port'], config['host'], () => {
    console.log(`Listening on host ${config['host']} at port ${config['port']}`);
});