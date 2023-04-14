const graphql = require("graphql");
// use of schema
// 1- defining object types
// 2 - relationship btw types
// 3 - define Rootqueries (root or entry point to the gragh)

// sample
const data = [
  {
    id: "2",
    name: "Love 4 you",
    genre: "Romance",
  },
  {
    id: "3",
    name: "Life balance",
    genre: "Peotry",
  },
  {
    id: "5",
    name: "Sky limit",
    genre: "Fantasy",
  },
];

// let get some gQL utils for this
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = graphql;

// using this we would define a new object type (type here = schema of responses)
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    // define different object fields
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    allSold: { type: GraphQLBoolean },
  }), // fields is handle by a fxn inorder to differetiate btw oth
});

// root-query (routes or entry points to the graph)
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // our first root query is querying a particular item (name_of_query, type_of_data)
    book: {
      type: BookType, // what kind of object-type woudld be returned
      args: { id: { type: GraphQLID } }, // args* to identity the object-data
      resolve(parent, args) {
        console.log("args:::", args);
        // here we write code to get data from DB/other source
        let book = data.find((x) => x.id == args.id);
        console.log("book-->", book);
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  // our schema has the query definition
  query: RootQuery,
});
