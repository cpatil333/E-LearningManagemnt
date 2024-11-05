import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {children} {/* Render any children passed to the modal */}
      </div>
    </div>
  );
};

export default Modal;
