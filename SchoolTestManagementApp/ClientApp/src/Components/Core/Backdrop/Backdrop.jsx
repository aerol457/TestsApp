import React, { useContext } from "react";

import "./Backdrop.css";
import { ModalContext } from "../../../context/TeacherContext/ModalContext";

const Backdrop = () => {
  const modalContext = useContext(ModalContext);

  return modalContext.stateModal ? (
    <div className="backdrop" onClick={modalContext.cancel}></div>
  ) : null;
};

export default Backdrop;
