const graphql = require("graphql");
// use of schema
// 1- defining object types
// 2 - relationship btw types
// 3 - define Rootqueries (root or entry point to the gragh)

// sample
const listBooks = [
  {
    id: "2",
    name: "Love 4 you",
    genre: "Romance",
    authorId: "1",
  },
  {
    id: "3",
    name: "Life balance",
    genre: "Peotry",
    authorId: "3",
  },
  {
    id: "5",
    name: "Sky limit",
    genre: "Fantasy",
    authorId: "2",
  },
  {
    id: "6",
    name: "Jimela",
    genre: "Fantasy",
    authorId: "2",
  },
  {
    id: "7",
    name: "Red groom dress",
    genre: "Romance",
    authorId: "1",
  },
];

const listAuthors = [
  { name: "Brel dinger", age: 44, id: "1" },
  { name: "Oluwa loni", age: 54, id: "2" },
  { name: "Tommy notion", age: 24, id: "3" },
  { name: "Niko wesley", age: 41, id: "4" },
];

// let get some gQL utils for this
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
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
        console.log("parent:::", parent);
        let author = listAuthors.find((x) => x.id == parent.authorId);
        return author;
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
      // if books is requestedm handle the query data to be returned
      resolve(parent, args) {
        // return all books with author's id
        let books = listBooks.filter((x) => x.authorId == parent.id);
        return books;
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
        console.log("book query args:::", args);
        // here we write code to get data from DB/other source
        let book = listBooks.find((x) => x.id == args.id);
        console.log("book-parent->", parent);
        console.log("book-->", book);
        return book;
      },
    },
    // query for athors
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        let author = listAuthors.find((x) => x.id == args.id);
        return author;
      },
    },
    // DEFINE QUERIES routes for listing-queries
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return listBooks;
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return listAuthors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  // our schema has the query definition
  query: RootQuery,
});
