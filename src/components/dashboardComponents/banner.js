import React from "react";

const Banner = (props) => {
  return (
    <section className="bannerMain">
      <div className="bannerContainer">
        <div className="row">
          <h2>
            <div className="line" style={{ marginBottom: "0px" }}>
              <span>Welcome back</span>{" "}
              <div className="fixer">Welcome back</div>
            </div>
            <div
              className="line"
              style={{ fontSize: "2.8rem", marginBottom: "3px" }}
            >
              <span>{props.fName}</span>{" "}
              <div className="fixer">{props.fName}</div>
            </div>
            <div className="line" style={{ fontSize: "3.3rem" }}>
              <span>{props.lName}</span>
              <div className="fixer">{props.lName}</div>
            </div>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Banner;
