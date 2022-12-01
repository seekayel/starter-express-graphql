const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')
const crypto = require('crypto')
const {CyclicDb} = require('@cyclic.sh/dynamodb')

const db = CyclicDb("wild-pike-clothesCyclicDB")

var app = express();

// Full Listing
// const items = await db.collection(col).list()

// Single Item
// const item = await db.collection(col).get(key)

// Delete Item
// const item = await db.collection(col).delete(key)

// Create Item
// const item = await db.collection(col).set(key, req.body)

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getCustomerById(id: ID!): Customer
  }
  type Mutation {
    createCustomer(name: String!, email: String!): Customer
  }
  type Customer {
    id: ID!
    name: String!,
    email: String!
  }
`);

function generateId() {
  return crypto.randomBytes(10).toString('hex')
}

const col = "customers"
// The root provides a resolver function for each API endpoint
var root = {
  getCustomerById: async ({id}) => {
    const cust =  await db.collection(col).get(id)
    console.log(JSON.stringify(cust,null,2))
    return cust.props
  },
  createCustomer: async ({name,email}) => {
    const cust = {id: generateId(), name, email}
    const res = await db.collection(col).set(cust.id, cust)
    console.log(JSON.stringify(res,null,2))
    return res.props
  }
};

const defaultQuery = `
# Welcome to the Cyclic GraphQL endpoint backed by DynamoDB
# Try inserting or querying!

# mutation {
#   createCustomer(
#     name: "Kam",
#     email: "kam.lasater@cyclic.sh"
#   ) {
#     id
#     name
#     email
#   }
# }

query {
  getCustomerById(id: "31d74c5d1b5081b27c1a") {
    id
    name
    email
  }
}
`

const graphQL = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: {
    defaultQuery
  },
})

app.use('/graphql', graphQL);

app.use('*', (req,res) => {
  res.redirect('/graphql')
})

app.listen(4000, () => {
  console.log('Now browse to localhost:4000/graphql')
});
