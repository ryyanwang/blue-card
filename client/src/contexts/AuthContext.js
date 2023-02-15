import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import axios from "axios";
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   auth: {
//     user: "webmaster@sus.ubc.ca", // generated ethereal user
//     pass: "Chromium20", // generated ethereal password
//   },
// });
// let emailMessage = ""
// let info = await transporter.sendMail({
//   from: '"Fred Foo 👻" <foo@example.com>', // sender address
//   to: "bar@example.com, baz@example.com", // list of receivers
//   subject: "Welcome to Blue Card", // Subject line
//   text: "Hello world?",
//   html: "<b>Hello world?</b>",
// });
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(thisemail, thispassword) {
    console.log("before auth");
    auth.createUserWithEmailAndPassword(thisemail, thispassword);
  }

  function signuptoDB(firstnameref, lastnameref, emailref, yearref, imageURL) {
    console.log(firstnameref, lastnameref, emailref, yearref);

    return setDoc(doc(db, "users", emailref), {
      email: emailref,
      firstname: firstnameref,
      lastname: lastnameref,
      year: yearref,
      image: imageURL,
    }).then(() => {
      sendUserEmail(emailref, firstnameref);
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(thisemail) {
    return auth.sendPasswordResetEmail(thisemail);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    signuptoDB,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

function sendUserEmail(email, firstName) {
  axios.post("https://localhost:5000/email", {
    email: email,
    firstName: firstName,
  });
}
