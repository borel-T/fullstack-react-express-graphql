import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/authors";

function BooList() {
  // state
  const [author, setAuthor] = useState("");
  const [bookName, setName] = useState("");
  const [genre, setGenre] = useState("");

  // use hook to fetch grahql data
  const { loading, error, data } = useQuery(GET_AUTHORS);

  // loading
  if (loading) return <p>...loading</p>;
  // error
  if (error) return <p>error:{error.message}</p>;

  const _handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      style={{ border: "1px solid green", maxWidth: 400 }}
      onSubmit={_handleSubmit}
    >
      <h4>Add a new book</h4>
      <div>
        <label htmlFor="i-name">Name:</label>
        <input
          name={"i-name"}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter book name"
        />
      </div>
      <div>
        <label htmlFor="i-genre">Genre:</label>
        <input
          name={"i-genre"}
          onChange={(e) => {
            setGenre(e.target.value);
          }}
          placeholder="Enter book genre"
        />
      </div>
      <div>
        <label htmlFor="i-author">Author:</label>
        <select
          name={"i-author"}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          value={author}
        >
          {data.authors.map((author, key) => (
            <option value={author.id} key={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default BooList;
