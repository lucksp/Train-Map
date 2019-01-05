import React, { Component } from "react";
import { connect } from "react-redux";
import { getFilteredData } from "../../../helpers";

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

  handleClick = (e, indexClicked) => {
    const between = [
      this.state.graphData[indexClicked - 1].millisecondOffset,
      this.state.graphData[indexClicked].millisecondOffset
    ];

    this.props.displaySelectedSegment(between);
  };

  render() {
    return (
      <ResponsiveContainer width="98%" height={400}>
        <LineChart width={600} height={300} data={this.state.graphData}>
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
    data: state.common.data
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
