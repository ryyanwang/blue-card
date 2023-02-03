import React, { useState } from "react";
import Login from "./Login";
import "./style.scss";
import Signup from "./Signup";
import Modal from "./Modal";
export default function Auth() {
  // const sign_in_btn = document.querySelector("#sign-in-btn");
  // const sign_up_btn = document.querySelector("#sign-up-btn");
  // const container = document.querySelector(".container");

  // const hiddenElements = document.querySelectorAll(".hidden");
  // hiddenElements.forEach((el) => observer.observe(el));
  const [signupState, setState] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
      {/* <Modal></Modal> */}
      <div
        class={`mainContainer ${signupState ? "sign-up-mode" : ""}`}
        id="foo"
      >
        <div class="forms-container">
          <div class="signin-signup">
            {<Login />}
            {<Signup />}
          </div>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>
                Sign up for the Blue Card Program today, or visit
                sus.bluecard.com to learn more
              </p>
              <button
                class="btn transparent"
                id="sign-up-btn"
                onClick={() => {
                  setState(true);
                }}
              >
                Sign up
              </button>
            </div>
            <img
              src={require("./images/log.svg").default}
              class="image"
              alt=""
            />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>Already have an account?</h3>
              <p>What are you doing then, sign in</p>
              <button
                class="btn transparent"
                id="sign-in-btn"
                onClick={() => {
                  setState(false);
                }}
              >
                Sign in
              </button>
            </div>
            <img
              src={require("./images/register.svg").default}
              class="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
