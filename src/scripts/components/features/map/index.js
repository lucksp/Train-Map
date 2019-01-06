import React, { Component } from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";
import { connect } from "react-redux";

class DataMap extends Component {
  state = {
    multiPolyline: null,
    betweenSegments: false
  };
  mapRef = React.createRef();

  componentDidMount() {
    this.mapRef.current.leafletElement.fitBounds(this.props.multiPolyline);
  }

  render() {
    return (
      <Map center={[0, 0]} zoom="15" id="map" ref={this.mapRef}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          weight="5"
          color={this.state.betweenSegments ? "red" : "green"}
          positions={this.props.multiPolyline}
        />
      </Map>
    );
  }
}
const mapStateToProps = state => {
  return {
    multiPolyline: state.common.multiPolyline,
    betweenSegments: state.common.betweenSegments
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataMap);
