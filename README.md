# starter-express-graphql

## Running

`npm run start` - then open localhost:4000/graphql

Run query with ui or direct:
```graphql
{
  hello
}
```
https://magnificent-blue-lovebird.cyclic.app/graphql?query=%7B%0A%20%20hello%0A%7D%0A&raw

Output:
```json
{
  "data": {
    "hello": "Hello world!"
  }
}
```
