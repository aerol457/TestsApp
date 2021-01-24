import React from "react";

import "./Button.css";

const Button = ({ children, outlined, clicked, filledRed }) => {
  return (
    <button
      className={
        outlined ? "btn-outlined" : filledRed ? "btn-filled-red" : "btn-filled"
      }
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
