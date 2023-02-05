import React from "react";

const Banner = (props) => {
  return (
    <section className="bannerMain">
      <div className="bannerContainer">
        <div className="row">
          <h2>
            <div className="line" style={{ marginBottom: "0px" }}>
              <span>Welcome back</span>
            </div>
            <div
              className="line"
              style={{ fontSize: "2.8rem", marginBottom: "3px" }}
            >
              <span>{props.fName}</span>
            </div>
            <div className="line" style={{ fontSize: "3.4rem" }}>
              <span>{props.lName}</span>
            </div>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Banner;
