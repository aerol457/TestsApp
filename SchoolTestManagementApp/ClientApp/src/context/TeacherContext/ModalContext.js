import React, { useState } from "react";

export const ModalContext = React.createContext({
  stateModal: false,
  stateSecondModal: false,
  showSecondModal: () => {},
  hideSecondModal: () => {},
  cancel: () => {},
  show: () => {},
});

const ModalContextProvider = (props) => {
  const [stateModal, setStateModal] = useState(false);
  const [stateSecondModal, setStateSecondModal] = useState(false);

  const handleCancelModal = () => {
    setStateModal(false);
  };

  const handleConfirmModal = () => {
    setStateModal(true);
  };

  const showSecondModal = () => {
    setStateSecondModal(true);
  };

  const hideSecondModal = () => {
    setStateSecondModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        stateModal: stateModal,
        stateSecondModal: stateSecondModal,
        showSecondModal: showSecondModal,
        hideSecondModal: hideSecondModal,
        cancel: handleCancelModal,
        show: handleConfirmModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
