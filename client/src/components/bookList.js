import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/books";
import BookDetails from "./bookDetails";

function BooList() {
  // use hook to fetch grahql data
  const { loading, error, data } = useQuery(GET_BOOKS);

  // current selected book
  const [current, setCurrent] = useState("");

  // loading
  if (loading) return <p>...loading</p>;
  // error
  if (error) return <p>error:{error.message}</p>;

  return (
    <div>
      <ul id="book-list" style={{ border: "3px solid green" }}>
        {data.books.map((book, key) => (
          <li
            style={{
              padding: 5,
              backgroundColor: "#d5d5d5",
              cursor: "pointer",
              marginBottom: 10,
            }}
            key={key}
            onClick={() => {
              setCurrent(book.id);
            }}
          >{`${book.name} - ${book.genre}`}</li>
        ))}
      </ul>
      {current !== "" ? <BookDetails bookId={current} /> : null}
    </div>
  );
}

export default BooList;
