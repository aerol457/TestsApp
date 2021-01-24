import React, { useEffect, useState } from "react";

import "./ErrorMessage.css";

const ErrorMessage = ({ children }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setShow(false);
    }, 2000);

    return clearInterval(setTime);
  }, []);

  return <div className="error-red">{show && children}</div>;
};
export default ErrorMessage;
