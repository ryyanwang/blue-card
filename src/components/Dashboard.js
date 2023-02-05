import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import IntroOverlay from "./dashboardComponents/introOverlay";
import Banner from "./dashboardComponents/banner";
import { gsap } from "gsap";
// import CSSRulePlugin from "gsap/CSSRulePlugin";
import "./dashboard.scss";
import susLogo2 from "./images/susLogo2.png";
import suslogo from "./images/susLogo.png";

const Dashboard = () => {
  const tl = gsap.timeline();

  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery(["user"], () => {
    return getDoc(doc(db, "users", currentUser?.email)).then((user) =>
      user.data()
    );
  });

  // const [animationComplete, setAnimationComplete] = useState(false);

  // const completeAnimation = () => {
  //   setAnimationComplete(true);
  // };
  useEffect(() => {
    refetch();
  }, [currentUser, refetch]);
  // ANIMATION STUFF
  let image = useRef(null);
  // let container = useRef(null);
  // let imageReveal = CSSRulePlugin.getRule(".img-container:after");
  let firstName = useRef(null);
  let lastName = useRef(null);
  let id = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      tl.from(".line span", {
        duration: 1.8,
        y: 100,
        ease: "power4.out",
        skewY: 7,
        stagger: {
          amount: 0.3,
        },
      })
        .to(".overlay-top", {
          duration: 1.3,
          height: 0,
          ease: "expo.inOut",
        })
        // .to(".smallText", {
        //   fontSize: "2.8rem",
        //   ease: "easeInOut",
        //   delay: -1,
        //   duration: 1.3,
        // })
        // .to(".largeText", {
        //   fontSize: "3.3rem",
        //   ease: "easeInOut",
        //   delay: -1.3,
        //   duration: 1.3,
        // })
        .to(".intro-overlay", 0, {
          css: { display: "none" },
        });
    });
    return () => ctx.revert();
    // homeAnimation(completeAnimation);
    // tl.to(
    //   container,
    //   {
    //     duration: 1,
    //   },
    //   { css: { visibility: "visible" } }
    // );
    // tl.to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut });
  });

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/auth");
    } catch {
      setError("error Logging Out");
    }
  }

  if (isLoading) {
    return (
      <div style={{ height: "100vh", backgroundColor: "black" }}>{/*  */}</div>
    );
  }

  image = data.image;
  firstName = data.firstname;
  lastName = data.lastname;
  id = data.year;
  return (
    <>
      <div className="headerContainer">
        <div className="rowThingy">
          <div className="logoThingy">BLUECARD </div>
          <img
            alt=""
            style={{ width: "114px", height: "28px" }}
            src={susLogo2}
          />
        </div>
      </div>
      <div
        onClick={() => {
          tl.progress(1).pause();
          console.log("cancelled");
        }}
      >
        <IntroOverlay />
      </div>

      <Banner fName={firstName} lName={lastName} />

      <div className="dashboardContainer">
        {/* {data?.firstname} {data?.lastname} */}
        {error && <Alert variant="danger"> {error}</Alert>}
        <div className="img-container">
          <img
            src={image}
            className="cardImage"
            alt=""
            // Res
            // ponsive
            // image
          />{" "}
          <div
            style={{ textAlign: "right", display: "block", fontWeight: "600" }}
          >
            ID= {id}
          </div>
        </div>
        {/* <img
          src={suslogo}
          className="susLogo"
          alt=""
          // Res
          // ponsive
          // image
        /> */}
        <input
          type="submit"
          value="Logout"
          style={{ marginTop: 12, backgroundColor: "black" }}
          className="btn solid"
          onClick={handleLogout}
        />
      </div>
      {/* 
      <div style={{ width: "100vw", heigh: "50vh" }}>
    
      </div> */}
    </>
  );
};
export default Dashboard;
