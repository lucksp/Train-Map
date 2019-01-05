import React, { Component } from "react";

export default class LabelAsPoint extends React.Component {
  onClick = e => {
    debugger;
    const { index, key, payload } = this.props;
    // you can do anything with the key/payload
  };
  render() {
    const { x, y, index } = this.props;
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
  }
}
