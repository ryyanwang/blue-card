import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./style.scss";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);

      await resetPassword(emailRef.current.value);
      setMessage(
        "Email sent successfully. Check your inbox for further instructions"
      );
    } catch {
      setError("Failed to Reset Password");
    }

    setLoading(false);
  }

  return (
    <div className="forgotPassword">
      <form
        className="sign-in-form"
        style={{ justifyContent: "center", display: "" }}
      >
        {error && (
          <Alert className="alert" variant="danger">
            {error}
          </Alert>
        )}
        {message && (
          <Alert className="positiveAlert" variant="danger">
            {message}
          </Alert>
        )}
        <h2 className="title"> Forgot your password?</h2>
        <p> Please enter the email you used to create your account</p>

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

        <input
          disabled={loading}
          type="submit"
          value="Reset Password"
          className="btn solid"
          onClick={handleSubmit}
        />
        <div className="w-100 text-center mt-2">
          Back to <Link to="/auth">homepage</Link>
        </div>
      </form>{" "}
    </div>
  );
}
