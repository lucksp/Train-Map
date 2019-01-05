import React from "react";

const LabelAsPoint = props => {
  const { x, y, index } = props;
  return (
    <circle
      className="circle-segment"
      onClick={e => {
        this.props.handleClick(e, index);
      }}
      cx={x}
      cy={y}
      r={8}
      fill="transparent"
    />
  );
};

export default LabelAsPoint;
