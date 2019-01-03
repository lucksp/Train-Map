// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: {}
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
        loading: false,
        data: {
          channelSet: action.payload.channelSet,
          samples: action.payload.samples
        }
      };

    default:
      return state;
  }
}
