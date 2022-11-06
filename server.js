var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


var app = express();


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
  type Mutation {
    newCustomer(name: String!, email: String!): [Customer]
  }
  type Customer {
    name: String!,
    email: String!
  }
`);


class Customer {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
}

// The root provides a resolver function for each API endpoint
var root = {
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
  newCustomer: ({name,email}) => {
    return new Customer(name, email);
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
