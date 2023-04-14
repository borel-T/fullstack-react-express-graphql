const express = require("express");

const app = express();
const { graphqlHTTP } = require("express-graphql"); // would be use as middleware to intercept gQl requests

// get our schema
const schema = require("./schema/index");

// use graphql as middleware
// graph ql funtion would be executed at each request
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // graph-ql schema
    graphiql: true, // use graphiql for queries to this path
  })
);

app.listen(4000, (err) => {
  if (err) {
    console.log("error launching server");
  }
  console.log("Node server is up listenning : 4000");
});
