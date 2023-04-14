import { gql } from "@apollo/client";

export const GET_BOOK = gql`
  {
    book(id: "")
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      name
      genre
    }
  }
`;
