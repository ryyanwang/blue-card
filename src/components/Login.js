import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
// import "./styling.scss";
import "./style.scss";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="sign-in-form">
      {/* <Form.Group id="email">
        {" "}
       
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={passwordRef} required />
      </Form.Group>
      <Button disabled={loading} className="signupButton" type="submit">
        {" "}
        Login{" "}
      </Button> */}
      {error && (
        <Alert variant="danger" className="alert">
          {error}
        </Alert>
      )}
      <h2
        className="title"
        style={{
          marginBottom: "15px",
          fontSize: "4rem",
          // alignSelf: "baseline",
          // paddingLeft: "10vm",
        }}
      >
        Blue Card
      </h2>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          id="email"
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
      </div>
      <input
        disabled={loading}
        type="submit"
        value="Login"
        className="btn solid"
        onClick={handleSubmit}
      />
      <Link className="social-text" to="/forgot-password">
        Forgot your password?
      </Link>
      {/* <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div> */}
    </form>
    // <div className="w-100 text-center mt3">
    //   <Link className="font-weight-bold" to="/forgot-password">
    //     Forgot Password?
    //   </Link>
    // </div>
    // <div>
    //   <h6 className="light-text"> or</h6>
    // </div>
    // <div className="centerTest">
    //   {/* <Form.Label className="text-center">
    //       Don't have an account yet? .
    //     </Form.Label>
    //     <Link className="font-weight-bold text" to="/signup">
    //       Signup
    //     </Link> */}
    //   <div className="w-100 text-center mt-2 ">
    //     Don't have an account yet? <Link to="/signup">Sign Up</Link>
    //   </div>
    // </div>
    /* <div className="mx-auto">
          <Button disabled={loading} className="w-75 mx-auto" type="submit">
            {" "}
            Signup{" "}
          </Button>
        </div> */
    /* </Card.Body>
      </Card> */
  );
}
