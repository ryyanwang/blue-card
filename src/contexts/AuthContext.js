import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
// const nodemailer = require("nodemailer");

// var transport = nodemailer.createTransport({
//   host: "sus",
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
