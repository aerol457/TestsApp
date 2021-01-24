import React, { useContext } from "react";
import { ImCancelCircle } from "react-icons/im";

import "./Modal.css";
import { ModalContext } from "../../../context/TeacherContext/ModalContext";

const Modal = ({ children }) => {
  const modalContext = useContext(ModalContext);

  return (
    <div className="modal-layout">
      <div className="modal-cancel">
        <ImCancelCircle
          className="modal-cancel-btn"
          onClick={modalContext.cancel}
        />
      </div>
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default Modal;
