import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

class Graph extends Component {
  state = {};
  render() {
    return (
      <ResponsiveContainer width="98%" height={400}>
        <LineChart
          width={600}
          height={300}
          data={[
            {
              name: "Page A",
              uv: 400,
              pv: 2400,
              amt: 2400
            },
            {
              name: "Page B",
              uv: 300,
              pv: 4567,
              amt: 2400
            },
            {
              name: "Page C",
              uv: 300,
              pv: 1398,
              amt: 2400
            },
            {
              name: "Page D",
              uv: 200,
              pv: 9800,
              amt: 2400
            },
            {
              name: "Page E",
              uv: 278,
              pv: 3908,
              amt: 2400
            },
            {
              name: "Page F",
              uv: 189,
              pv: 4800,
              amt: 2400
            }
          ]}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" opacity="0.25" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default Graph;
