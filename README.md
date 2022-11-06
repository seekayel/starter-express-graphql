# starter-express-graphql

This starter will setup a graphql query endpoint to the Cyclic AWS DynamoDB table.

It is adapted from: https://graphql.org/graphql-js/

## Running

`npm run start` - then open localhost:4000/graphql

### UI

Run query with ui:  https://wild-pike-clothes.dev.cyclic.app/graphql

```graphql
{
  hello
}
```

Output:
```json
{
  "data": {
    "hello": "Hello world!"
  }
}
```


### Via shell
```shell
$ curl -i -X POST \
    -w '\n\nTook: %{time_total}s' \
    -H "Content-Type: application/json" \
    -d '{"query": "query {getCustomerById(id: \"31d74c5d1b5081b27c1a\") {id,name,email}}"}' \
    https://wild-pike-clothes.dev.cyclic.app/graphql
```

```shell
HTTP/2 200 
date: Sat, 05 Nov 2022 01:51:44 GMT
content-type: application/json; charset=utf-8
content-length: 33
x-powered-by: Express
etag: W/"21-Cw2fLGx7Vfv0DPSIKJWRcdIvc8I"
apigw-requestid: bGszoiPiBcwEJuw=

{"data":{"hello":"Hello world!"}}
```

### Via Javascript

Open dev console on: https://wild-pike-clothes.dev.cyclic.app/

And run the following:

```javascript
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```
