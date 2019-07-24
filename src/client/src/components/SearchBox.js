import React from "react";

const SearchBox = ({ searchChange, input }) => {
  return (
    <div className="pa3 dib">
      <input
        className="pa2 ba b--green br3 bg-lightest-blue"
        id="search"
        placeholder="search robots"
        onChange={searchChange}
        value={input}
        />
    </div>
  );
};

export default SearchBox;
