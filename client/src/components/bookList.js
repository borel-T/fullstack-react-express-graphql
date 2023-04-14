import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books: {
      name
      genre
    }
  }
`;

function BooList() {
  // use hook to fetch grahql data
  const { loading, error, data } = useQuery(GET_BOOKS);

  // loading
  if (loading) return <p>...loading</p>;
  // error
  if (error) return <p>error:{error.message}</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book, key) => (
          <li key={key}>{`${book.name} - ${book.genre}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default BooList;