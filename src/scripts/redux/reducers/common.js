// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  data: {},
  channelSet: []
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
        channelSet: action.payload.channelSet
      };
    case ActionTypes.DATA_FILTERED:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    default:
      return state;
  }
}
