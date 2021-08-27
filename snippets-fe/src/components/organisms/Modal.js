import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../molecules/Backdrop";
import ModalBox from "../molecules/ModalBox";

const Modal = (props) => {
  const modalRoot = document.getElementById("modal-root");
  const closeModal = () => props.closeModal();

  return ReactDOM.createPortal(
    <Backdrop>
      <ModalBox closeModal={closeModal}>{props.children}</ModalBox>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;
