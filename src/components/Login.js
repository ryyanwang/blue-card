import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./styling.css";
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
    <Card className="centerCard">
      <Card.Body>
        <h2 className="text-center mb-4"> Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
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
          </Button>
        </Form>
        <div className="w-100 text-center mt3">
          <Link className="font-weight-bold" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <div>
          <h6 className="light-text"> or</h6>
        </div>
        <div className="centerTest">
          {/* <Form.Label className="text-center">
            Don't have an account yet? .
          </Form.Label>
          <Link className="font-weight-bold text" to="/signup">
            Signup
          </Link> */}
          <div className="w-100 text-center mt-2 ">
            Don't have an account yet? <Link to="/signup">Sign Up</Link>
          </div>
        </div>

        {/* <div className="mx-auto">
          <Button disabled={loading} className="w-75 mx-auto" type="submit">
            {" "}
            Signup{" "}
          </Button>
        </div> */}
      </Card.Body>
    </Card>
  );
}
