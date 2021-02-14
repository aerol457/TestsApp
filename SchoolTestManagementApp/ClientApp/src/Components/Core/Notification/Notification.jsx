import React, { useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import "./Notification.css";

const Notification = ({ message, resetError, error }) => {
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        resetError(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div
      className={
        error ? "pop-up-grade-error" : "pop-up-grade-error pop-up-transparent"
      }
    >
      <p>
        <span className="pop-up-icon">
          <AiOutlineInfoCircle />
        </span>
        {message}
      </p>
    </div>
  );
};

export default Notification;
