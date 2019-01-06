import React, { Component } from "react";
import { connect } from "react-redux";
import { calcBestTimes } from "../../../redux/actions/common";

class Effort extends Component {
  state = {};

  componentDidMount() {
    this.props.calcBestTimes([1, 5, 10, 15, 20]);
  }

  render() {
    const headers = [];
    return (
      <div className="content">
        {Object.keys(this.props.bestEffort).map((efforts, i) => {
          return (
            <div key={i} className="results">
              <div>
                {efforts} Minute Interval:
                <div className="result">
                  Best Effort: {this.props.bestEffort[efforts].bestEffort}
                </div>
                <div className="result">
                  Power: {this.props.bestEffort[efforts].power}
                </div>
                <div className="result">
                  Heart Rate: {this.props.bestEffort[efforts].heartRate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bestEffort: state.common.bestEffort,
    channelSet: state.common.channelSet
  };
};
const mapDispatchToProps = dispatch => {
  return {
    calcBestTimes: times => dispatch(calcBestTimes(times))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Effort);
