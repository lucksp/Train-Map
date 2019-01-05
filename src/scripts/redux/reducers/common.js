// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  data: {},
  channelSet: [],
  betweenSegments: []
};

export default function data(state = state ? state : initialState, action) {
  switch (action.type) {
    case ActionTypes.DATA_FETCH:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.DATA_SUCCESS:
      return {
        ...state,
        channelSet: action.payload.channelSet,
        data: action.payload.samples,
        loading: false
      };

    case ActionTypes.GRAPH_SEGMENT_CLICKED:
      return {
        ...state,
        betweenSegments: action.payload
      };

    default:
      return state;
  }
}
