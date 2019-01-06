import React from "react";

const LabelAsPoint = props => {
  const { x, y, index, handleClick } = props;
  return (
    <circle
      className="circle-segment"
      onClick={e => {
        handleClick(e, index);
      }}
      cx={x}
      cy={y}
      r={8}
      fill="transparent"
    />
  );
};

export default LabelAsPoint;
