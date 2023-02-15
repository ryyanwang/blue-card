import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
export default function Success() {
  return (
    <>
      <div className="forgotPassword" style={{ height: "70vh" }}>
        <form
          className="sign-in-form"
          style={{ justifyContent: "center", display: "" }}
        >
          <h2 className="title"> Success</h2>
          <p> Enjoy your discounts. Check your inbox for more information.</p>

          <div className="w-100 text-center mt-2">
            <Link to="/">Take me there</Link>
          </div>
        </form>
      </div>
      <div style={{ height: "30vh", width: "100vw" }}>
        <img
          src={require("./images/tree.svg").default}
          class="successImg"
          alt=""
          style={{ display: "flex" }}
        ></img>
      </div>
    </>
  );
}
