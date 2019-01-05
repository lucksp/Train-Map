// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";
import { getFilteredData } from "../helpers";

const initialState = {
  loading: true,
  error: null,
  data: {},
  channelSet: [],
  betweenSegments: [],
  bestTimes: {}
};

export default function data(state = state ? state : initialState, action) {
  switch (action.type) {
    case ActionTypes.DATA_FETCH:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.DATA_SUCCESS:
      const commonData = getFilteredData(action.payload.samples);

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
      debugger;
      const times = { ...action.payload };

      return {
        ...state
      };

    default:
      return state;
  }
}
