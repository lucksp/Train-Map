import React, { Component } from "react";

import Home from "./Home";

import { connect } from "react-redux";
import { dataFetch } from "../redux/actions/common";

class App extends Component {
  componentDidMount() {
    this.props.dataFetch();
  }
  render() {
    return this.props.loading ? <div>Loading...</div> : <Home />;
  }
}

function mapStateToProps(state) {
  return {
    loading: state.common.loading
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
