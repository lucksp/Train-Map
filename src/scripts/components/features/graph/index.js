import React, { Component } from "react";
import { connect } from "react-redux";
import { getFilteredData } from "../../../helpers";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

class Graph extends Component {
  state = {
    graphData: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data) {
      // massage data for use by graph library
      const filtered = getFilteredData(nextProps.data);
      let segment = 1;
      const graphData = filtered
        .filter(item => {
          return item.millisecondOffset % 20000 === 0;
        })
        .map(item => {
          item = {
            ...item,
            ...item.values,
            time: segment * 2
          };
          segment++;
          return item;
        });
      // set start & end points.
      graphData.splice(0, 0, nextProps.data[0]);
      graphData[0] = {
        ...graphData[0],
        time: 0,
        ...graphData[0].values
      };
      graphData.push(nextProps.data[nextProps.data.length - 1]);
      graphData[graphData.length - 1] = {
        ...graphData[graphData.length - 1],
        time: segment * 2,
        ...graphData[graphData.length - 1].values
      };

      return { graphData };
    }
    return null;
  }

  render() {
    return (
      <ResponsiveContainer width="98%" height={400}>
        <LineChart width={600} height={300} data={this.state.graphData}>
          <Line type="monotone" dataKey="power" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" opacity="0.25" />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.common.data
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Graph);
