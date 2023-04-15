import React from "react";
import { GET_BOOK } from "../queries/books";
import { useQuery } from "@apollo/client";

function BookDetails({ bookId }) {
  const { loading, data, error } = useQuery(GET_BOOK, {
    variables: {
      id: bookId,
    },
  });
  if (bookId == undefined) {
    return null;
  }
  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    console.log("id====", bookId);
    return <p style={{ color: "red" }}>error fetching the book</p>;
  }

  return (
    <div>
      {console.log("data::", data)}
      <p>{`Book Name ->${data.book.name}`}</p>
      <p>{`Book Genre ->${data.book.genre}`}</p>
      <p>{`Book Author : ${data.book.author.name}, Age: ${data.book.author.name}`}</p>
      <p>{`-----Other Books------`}</p>
      <div>
        {data.book.author.books.map((book, key) => (
          <p key={key}>{`${book.name} - ${book.genre}`}</p>
        ))}
      </div>
    </div>
  );
}
export default BookDetails;
