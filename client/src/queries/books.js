import { gql } from "@apollo/client";

export const GET_BOOK = gql`
  query ($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        books {
          name
          genre
        }
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
    }
  }
`;

export const ADD_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;
