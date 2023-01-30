import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storageRef } from "../firebase";
import "./styling.css";

export default function Signup() {
  // references i need
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const yearRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const checkboxRef = useRef();
  //const file = useRef();
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);

  // methods i need
  const { signup, signuptoDB } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkboxRef.current.checked) {
      return setError(
        "Please confirm that you are a Science Undergraduate student"
      );
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    // FIRST, i upload the image. if its successful, i can retrieve the url and pass it to the signup. otherwise, i return an error

    if (imageUpload == null) {
      return setError("Please enter a file");
    }

    const imageRef = ref(storageRef, `images/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);
    const imageURL = await getDownloadURL(imageRef);
    console.log(imageURL);

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current.value);
      console.log(firstnameRef.current.value);
      console.log(yearRef.current.value);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstnameRef.current.value,
        lastnameRef.current.value,
        yearRef.current.value
      );
      // here im making sure i successfuly sign up to the auth instance first before i put the information in the database

      await signuptoDB(
        firstnameRef.current.value,
        lastnameRef.current.value,
        emailRef.current.value,
        yearRef.current.value,
        imageURL
      );
      console.log("made through sign up on db");
    } catch {
      setError("Failed to create an account");
    }

    navigate("/login");
    setLoading(false);
  }

  return (
    <Card className="centerCard">
      <Card.Body>
        <h2 className="text-center mb-4"> Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" ref={firstnameRef} required />
          </Form.Group>
          <Form.Group id="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" ref={lastnameRef} required />
          </Form.Group>
          <Form.Group id="year">
            <Form.Label>Year</Form.Label>
            <Form.Control type="number" ref={yearRef} required />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Form.Group id="photo">
            <Form.Label>ID photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
          </Form.Group>
          <Form.Group
            id="checkbox"
            className="checkbox"
            style={{ paddingTop: 5 }}
          >
            <input type="checkbox" ref={checkboxRef} />
            <Form.Label style={{ paddingTop: 10, paddingLeft: 10 }}>
              "I certify that I am a Science Undergraduate student at the
              University of British Columbia"
            </Form.Label>
          </Form.Group>
          <Button disabled={loading} className="signupButton" type="submit">
            {" "}
            Sign Up{" "}
          </Button>
          <div className="w-100 text-center mt-2 ">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
