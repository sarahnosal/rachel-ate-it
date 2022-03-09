import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#F3DFE3",
  padding: "50px",
  paddingTop: '40px',
  paddingBottom: '80px',
  zIndex: 1000,
  fontFamily: 'Cormorant SC',
  fontSize: '20px',
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

function Modal({ open, children }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className='modal' style={MODAL_STYLES}>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;