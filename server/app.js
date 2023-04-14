const express = require("express");
const moogoose = require("mongoose");
require("dotenv/config");
const app = express();
const { graphqlHTTP } = require("express-graphql"); // would be use as middleware to intercept gQl requests
const CORS = require("cors");

// get our schema
const schema = require("./schema/index"); // schema using hard-coded data
const schemaWithMongoDB = require("./schema/schemaWithMongoDB"); // schema using mongoDB
const { default: mongoose } = require("mongoose");

// allow cross-origin-server requests
app.use(CORS());

// use graphql as middleware
// graph ql funtion would be executed at each request
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemaWithMongoDB, // graph-ql schema
    graphiql: true, // use graphiql for queries to this path
  })
);

// connect to mongo
moogoose.connect(process.env.DB_CONNECTION);
mongoose.connection.once("open", () => [console.log("connection to DB")]);

app.listen(4000, (err) => {
  if (err) {
    console.log("error launching server");
  }
  console.log("Node server is up listenning : 4000");
});
