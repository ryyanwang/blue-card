import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storageRef } from "../firebase";
import "./style.scss";

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
  const [creatingAccount, setCreatingAccount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("started");
    setCreatingAccount("Creating account, please wait...");
    // if (!checkboxRef.current.checked) {
    //   return setError(
    //     "Please confirm that you are a Science Undergraduate student"
    //   );
    // }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setCreatingAccount("");
      return setError("Passwords do not match");
    }

    console.log("passwords match");
    // FIRST, i upload the image. if its successful, i can retrieve the url and pass it to the signup. otherwise, i return an error

    if (imageUpload == null) {
      setCreatingAccount("");
      return setError("Please upload an image");
    }
    console.log("image upload successful");

    const imageRef = ref(storageRef, `images/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);
    const imageURL = await getDownloadURL(imageRef);
    console.log(imageURL);

    try {
      setError("");
      setLoading(true);

      console.log(emailRef.current.value);
      console.log(firstnameRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      // here im making sure i successfuly sign up to the auth instance first before i put the information in the database
      console.log("succesffulyy auth");
      let id = Math.round(Math.random() * (9999999 - 1000000) + 1000000);
      await signuptoDB(
        firstnameRef.current.value,
        lastnameRef.current.value,
        emailRef.current.value,
        id,
        imageURL
      );
      console.log("made through sign up on db");
    } catch {
      setCreatingAccount("");
      setError("Failed to create an account");
    }

    console.log("signup successful");
    navigate("/success");
    setLoading(false);
  }

  return (
    <form
      className="sign-up-form"
      // onSubmit={handleSubmit}
    >
      {creatingAccount && (
        <Alert className="loadingAlert" variant="danger">
          {creatingAccount}
        </Alert>
      )}
      {error && (
        <Alert className="alert" variant="danger">
          {error}
        </Alert>
      )}
      <h2 className="title">Sign up</h2>
      <div class="input-field" style={{ margin: 7 }}>
        <i class="fas fa-user"></i>
        <input
          id="firstname"
          type="text"
          placeholder="First Name"
          ref={firstnameRef}
          required
        />
      </div>
      <div class="input-field" style={{ margin: 7 }}>
        <i class="fas fa-user"></i>
        <input
          id="lastname"
          type="text"
          placeholder="Last Name"
          ref={lastnameRef}
          required
        />
      </div>
      {/* <div class="input-field">
        <i class="fas fa-user"></i>
        <input
          id="year"
          type="number"
          placeholder="Year"
          ref={yearRef}
          required
        />
      </div> */}
      <div class="input-field" style={{ margin: 7 }}>
        <i class="fas fa-envelope"></i>
        <input
          id="email"
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
      </div>
      <div class="input-field" style={{ margin: 7 }}>
        <i class="fas fa-lock"></i>
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
      </div>
      <div class="input-field" style={{ margin: 7 }}>
        <i class="fas fa-lock"></i>
        <input
          id="password-confirm"
          type="password"
          placeholder="Password confirmation"
          ref={passwordConfirmRef}
          required
        />
      </div>
      {/* <input
        className="custom-file-input"
        id="photo"
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
        required
      /> */}
      <div>
        <div
          style={{ marginTop: 10 }}
          class="upload-btn-wrapper"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
          required
        >
          <button class="uploadButton">Upload Photo ID</button>
          <input type="file" name="myfile" />
        </div>
      </div>

      {/* <Form.Group id="firstname">
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
      </Form.Group> */}
      {/* <Form.Group id="checkbox" className="checkbox" style={{ paddingTop: 5 }}>
        <input type="checkbox" ref={checkboxRef} />
        <Form.Label style={{ paddingTop: 10, paddingLeft: 10 }}>
          "I certify that I am a Science Undergraduate student at the University
          of British Columbia"
        </Form.Label>
      </Form.Group> */}
      <input
        disabled={loading}
        type="submit"
        value="Sign Up"
        style={{ marginTop: 12 }}
        class="btn solid"
        onClick={handleSubmit}
      />
      {/* <Button disabled={loading} className="signupButton" type="submit">
        {" "}
        Sign Up{" "}
      </Button> */}
      {/* <div className="w-100 text-center mt-2 ">
        Already have an account? <Link to="/login">Login</Link>
      </div> */}
    </form>
  );
}
