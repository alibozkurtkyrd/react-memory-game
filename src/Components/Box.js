import React from "react";
import "../App.css";
import { useState } from "react";

export const Box = (props) => {
  // this state controls the second opened card situation
  const [containerCss, setcontainerCss] = useState(false);

  function handleClick(event) {
    props.changeCss(); // open the card
    setcontainerCss(true);

    // after 0.8 sc later set the state as false
    setTimeout(() => {
      setcontainerCss(false);
    }, 800);
  }

  return (
    <div className="box" onClick={handleClick}>
      <div
        className={`content ${containerCss ? "second" : ""}`}
        style={props.style}
      >
        <img
          className={`card-front ${props.opened == true ? "opened" : ""}`}
          src={props.imgPath}
        ></img>
      </div>
    </div>
  );
};
