var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


var app = express();


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getCustomer(email: String!): Customer
  }
  type Mutation {
    createCustomer(name: String!, email: String!): Customer
  }
  type Customer {
    name: String!,
    email: String!
  }
`);

var fakeDatabase = {};

class Customer {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
}

// The root provides a resolver function for each API endpoint
var root = {
  getCustomer: ({email}) => {
    return fakeDatabase.email
  },
  createCustomer: ({name,email}) => {
    let cust = new Customer(name, email);
    fakeDatabase.email = cust
    return cust
  }
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use('*', (req,res) => {
  res.redirect('/graphql')
})

app.listen(4000, () => {
  console.log('Now browse to localhost:4000/graphql')
});
