import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div>
          <p></p> <h2 style={{ fontSize: "1.7rem" }}>Before we start</h2>
        </div>
        <div className="body">
          <p style={{ textAlign: "left", fontSize: "1rem" }}>
            By signing up, you are certifying that you are a Science
            undergraduate student at the University of British Columbia.
          </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
