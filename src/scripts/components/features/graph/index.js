import React, { Component } from "react";
import { connect } from "react-redux";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend
} from "recharts";
import LabelAsPoint from "./LabelAsPoint";
import { displaySelectedSegment } from "../../../redux/actions/common";

class Graph extends Component {
  state = {
    graphData: []
  };

  clickedRef = React.createRef();

  handleClick = (e, indexClicked) => {
    const between = [
      this.props.graphData[indexClicked - 1].millisecondOffset,
      this.props.graphData[indexClicked].millisecondOffset
    ];

    this.props.displaySelectedSegment(between);
  };

  render() {
    return (
      <ResponsiveContainer width="98%" height={500}>
        <LineChart width={600} height={300} data={this.props.graphData}>
          <Line
            type="monotone"
            dataKey="power"
            stroke="#8884d8"
            label={
              <LabelAsPoint handleClick={this.handleClick} {...this.props} />
            }
            activeDot={false}
          />
          <CartesianGrid stroke="#ccc" opacity="0.25" />
          <XAxis dataKey="time" />
          <YAxis />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    graphData: state.common.graphData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    displaySelectedSegment: between => dispatch(displaySelectedSegment(between))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Graph);
