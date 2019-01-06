// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";
import { getFilteredData } from "../helpers";

const initialState = {
  loading: true,
  error: null,
  data: {},
  channelSet: [],
  betweenSegments: [],
  bestEffort: {}
};

export default function data(state = state ? state : initialState, action) {
  switch (action.type) {
    case ActionTypes.DATA_FETCH:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.DATA_SUCCESS:
      var commonData = getFilteredData(action.payload.samples);

      // massage data for Graph
      let segment = 1;
      const graphData = commonData
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
      graphData.splice(0, 0, action.payload.samples[0]);
      graphData[0] = {
        ...graphData[0],
        time: 0,
        ...graphData[0].values
      };
      graphData.push(action.payload.samples[action.payload.samples.length - 1]);
      graphData[graphData.length - 1] = {
        ...graphData[graphData.length - 1],
        time: segment * 2,
        ...graphData[graphData.length - 1].values
      };

      const multiPolyline = commonData.map(item => {
        return [item.positionLat, item.positionLong];
      });

      return {
        ...state,
        channelSet: action.payload.channelSet,
        graphData,
        multiPolyline,
        commonData,
        loading: false
      };

    case ActionTypes.GRAPH_SEGMENT_CLICKED:
      const betweenSegments = action.payload;
      let multiPolylineBetween = [];

      state.commonData.forEach(item => {
        if (
          item.millisecondOffset >= betweenSegments[0] &&
          item.millisecondOffset <= betweenSegments[1]
        ) {
          multiPolylineBetween.push([item.positionLat, item.positionLong]);
        }
      });

      return {
        ...state,
        multiPolyline: multiPolylineBetween,
        betweenSegments: action.payload
      };

    case ActionTypes.CALC_BEST_EFFORT:
      const times = [...action.payload];
      var commonData = state.commonData;

      let overall = {};
      const timeByChunk = (array, propertyName, times) => {
        times.forEach((time, timesIndex) => {
          // convert time in min to millisec
          const milliTime = time * 6000;
          // track previous time slot for knowing which bin
          const previousTime =
            timesIndex === 0 ? 0 : times[timesIndex - 1] * 6000;
          array.forEach((item, index) => {
            if (typeof overall[time] === "undefined") {
              overall[time] = [];
            }

            // To calculate "best effort":  Take heartRate / power
            const bestEffort =
              Math.round((item.power / item.heartRate) * 100) / 100;
            item = {
              ...item,
              bestEffort
            };

            if (
              item[propertyName] >= previousTime &&
              item[propertyName] < milliTime
            ) {
              overall[time].push(item);
            }
          });
        });
      };

      timeByChunk(commonData, "millisecondOffset", times);

      let bestEffort = {};
      const returnBestInterval = group => {
        // find highest value
        var t = Math.max.apply(
          Math,
          group.map(function(item) {
            return item.bestEffort;
          })
        );
        // return actual item with data
        return group.find(item => item.bestEffort === t);
      };

      Object.keys(overall).forEach(timeGroup => {
        bestEffort[timeGroup] = returnBestInterval(overall[timeGroup]);
      });

      return {
        ...state,
        bestEffort
      };

    default:
      return state;
  }
}
