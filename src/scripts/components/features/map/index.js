import React, { Component } from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";
import { connect } from "react-redux";
import { getFilteredData } from "../../../helpers";

class DataMap extends Component {
  state = {
    multiPolyline: null
  };
  mapRef = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data) {
      const multiPolyline = getFilteredData(nextProps.data).map(
        (item, nextProps) => {
          let itemArray = [];
          itemArray.push.apply(itemArray, [
            item.values.positionLat,
            item.values.positionLong
          ]);
          return itemArray;
        }
      );
      return { multiPolyline: multiPolyline };
    }
    return null;
  }

  componentDidMount() {
    this.mapRef.current.leafletElement.fitBounds(this.state.multiPolyline);
  }

  render() {
    return (
      <Map center={[0, 0]} zoom="15" id="map" ref={this.mapRef}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline color="red" positions={this.state.multiPolyline} />
      </Map>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.common.data,
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
