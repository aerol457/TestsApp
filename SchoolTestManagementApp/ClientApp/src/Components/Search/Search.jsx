import React from "react";

import "./Search.css";
import Button from "../Core/Button/Button";
import Error from "../Core/Error/Error";

const Search = ({ submitForm, input, setInput, error }) => {
  return (
    <form onSubmit={submitForm}>
      <div className="search-content">
        <label>ID:</label>
        <input
          type="text"
          placeholder="Insert Id to search.."
          onChange={setInput}
          value={input}
        />
        <Button>SUBMIT</Button>
      </div>
      <div className="search-error">
        <Error error={error} />
      </div>
    </form>
  );
};

export default Search;
