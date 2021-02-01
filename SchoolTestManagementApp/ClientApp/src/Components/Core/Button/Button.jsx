import React from "react";

import "./Button.css";

const Button = ({ children, outlined, clicked, filledRed, outlinedWhite }) => {
  return (
    <button
      className={
        outlined
          ? "btn-outlined"
          : filledRed
          ? "btn-filled-red"
          : outlinedWhite
          ? "btn-outlined-white"
          : "btn-filled"
      }
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
