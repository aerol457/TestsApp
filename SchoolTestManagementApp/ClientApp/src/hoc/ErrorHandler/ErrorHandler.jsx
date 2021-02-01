import React from "react";

import "./ErrorHandler.css";
import Modal from "../../Components/Core/Modal/Modal";
import useErrorHandler from "./error";

const errorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal show={error} clicked={clearError}>
          <h5>An error occur</h5>
          <p>
            Sorry about the inconvenience, We handle to fix this problem as soon
            as we can.
          </p>
          {error ? <p>({error.message})</p> : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default errorHandler;
