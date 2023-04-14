import { gql } from "@apollo/client";

export const GET_AUTHOR = gql`
  {
    author(id: "")
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      id
    }
  }
`;
