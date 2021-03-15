import React from "react";

import "./Button.css";

const Button = ({
  children,
  outlined,
  clicked,
  filledRed,
  outlinedWhite,
  disabled = false,
}) => {
  return (
    <button
      className={
        outlined && disabled
          ? "btn-outlined btn-disabled"
          : outlined
          ? "btn-outlined"
          : filledRed && disabled
          ? "btn-filled-red btn-disabled"
          : filledRed
          ? "btn-filled-red"
          : outlinedWhite && disabled
          ? "btn-outlined-white btn-disabled"
          : outlinedWhite
          ? "btn-outlined-white"
          : disabled
          ? "btn-filled btn-disabled"
          : "btn-filled"
      }
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
