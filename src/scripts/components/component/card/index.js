import React from "react";

const Card = props => {
  return (
    <div className={`content-wrapper ${props.addClass}`}>{props.children}</div>
  );
};

export default Card;
