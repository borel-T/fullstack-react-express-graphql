const graphql = require("graphql");
const Book = require("../models/book"); // import DB models
const Author = require("../models/author"); // import DB models

// use of schema
// 1- defining object types
// 2 - relationship btw types
// 3 - define Rootqueries (root or entry point to the gragh)

// let get some gQL utils for this
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList, // list of schemas
  GraphQLNonNull, // non null fieldns
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
    authorId: { type: GraphQLID },
    // DEFINE QUERY FOR RELATED SCHEMAS
    author: {
      type: AuthorType, // mention it's type
      // resolve the query (parent here represents the book schema, which is the current parent of the author in this type definition)
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }), // fields is handle by a fxn inorder to differetiate btw oth
});

// author type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    // an author can have more than 1 book
    // let tell the object type that our author can have a list of books
    books: {
      type: new GraphQLList(BookType),
      // if books is requested handle the query data to be returned
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
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
        return Book.findById(args.id);
      },
    },
    // query for athors
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    // DEFINE QUERIES routes for listing-queries
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find();
      },
    },
  },
});

// Our mutations
// mutations allow us to create, update, delete data
const Mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // create a mutation action for adding to DB
    addAuthor: {
      // which type of data are we adding
      type: AuthorType,
      // what are we expecting as data to be stored
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
      },
      // now let's handle the add request
      resolve(parent, args) {
        // mongoose add
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        // saving
        return author.save();
      },
    },
    // create a mutation action for adding to DB
    addBook: {
      // which type of data are we adding
      type: BookType,
      // what are we expecting as data to be stored
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      // now let's handle the add request
      resolve(parent, args) {
        // mongoose add
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        // save and return success
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  // our schema has the query definition
  query: RootQuery,
  // pass our mutations
  mutation: Mutations,
});
