import React from "react";

export default function SearchBar(props) {
  const { input, inputHandler } = props;

  return (
    <input
      id="search__bar"
      className="container--100 t--size-h3"
      placeholder="Find..."
      value={input}
      onChange={e => inputHandler(e.target.value)}
    />
  );
}
