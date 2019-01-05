import React, { Component } from "react";
import { Map, TileLayer, Polyline } from "react-leaflet";
import { connect } from "react-redux";
import { getFilteredData } from "../../../helpers";

class DataMap extends Component {
  state = {
    multiPolyline: null,
    betweenSegments: false
  };
  mapRef = React.createRef();

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data) {
      const { betweenSegments } = { ...nextProps };
      let multiPolyline = [];
      let filtered = getFilteredData(nextProps.data).map(item => {
        item = {
          ...item,
          ...item.values
        };
        if (betweenSegments.length) {
          if (
            item.millisecondOffset >= betweenSegments[0] &&
            item.millisecondOffset <= betweenSegments[1]
          ) {
            multiPolyline.push([item.positionLat, item.positionLong]);
          }
        } else {
          multiPolyline.push([item.positionLat, item.positionLong]);
        }
        return item;
      });

      return {
        multiPolyline: multiPolyline,
        betweenSegments: betweenSegments.length
      };
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
        <Polyline
          color={this.state.betweenSegments ? "red" : "green"}
          positions={this.state.multiPolyline}
        />
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
