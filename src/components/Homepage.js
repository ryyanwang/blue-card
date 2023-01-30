// import React, { useRef, useState } from "react";
import "./style.css";

export default function Homepage() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
  return (
    <body>
      <section>
        <h1>Hi Mom</h1>
        <p> This is my website</p>
      </section>
      <section>
        <h2>Buy my product</h2>
        <p>
          The thing you own end up owning you. Its only after you lose
          everything that you're free to do everything
        </p>
      </section>
      <section>
        <h2>Its so very poggers</h2>
      </section>
    </body>
  );
}
