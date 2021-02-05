import React from "react";
import { BiError } from "react-icons/bi";

import "./Error.css";

const Error = ({ error }) => {
  return (
    <div className="error">
      {error && (
        <p>
          <BiError className="error-icon" /> {error}
        </p>
      )}
    </div>
  );
};

export default Error;
