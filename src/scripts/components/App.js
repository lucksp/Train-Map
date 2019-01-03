import React, { Component } from "react";

import Home from "./Home";

import { connect } from "react-redux";
import { dataFetch } from "../redux/actions/common";

class App extends Component {
  componentDidMount() {
    this.props.dataFetch();
  }
  render() {
    return <Home />;
  }
}

function mapStateToProps(state) {
  return {
    playerData: state.common.playerData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dataFetch: () => dispatch(dataFetch())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
