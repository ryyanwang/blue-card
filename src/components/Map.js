import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
export default function Map() {
  return (
    <div
      className="forgotPassword"
      style={{ height: "100vh", marginLeft: "10px" }}
    >
      <div
        className="sign-in-form"
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <h2 className="title"> Blue Card Locations</h2>
        <p> Enjoy your discounts. Check your inbox for more information.</p>
        <div style={{ display: "block" }}>
          <iframe
            style={{
              borderRadius: "20px",
              height: "60vh",
              width: "95vw",
              margin: "auto",
            }}
            title="bluecardlocations"
            src="https://www.google.com/maps/d/embed?mid=1-cQNxoKmeWvm4mY0AR4D9nQN6UUmWNY&ehbc=2E312F"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
