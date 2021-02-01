import React from "react";
import { ImCancelCircle } from "react-icons/im";

import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ children, clicked, show }) => {
  return (
    show && (
      <div>
        <Backdrop clicked={clicked} />
        <div className="modal-layout">
          <div className="modal-cancel">
            <ImCancelCircle className="modal-cancel-btn" onClick={clicked} />
          </div>
          <div className="modal-container">{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
