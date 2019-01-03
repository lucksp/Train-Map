// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";

const initialState = {
  test: "nope"
};

export default function data(state = state ? state : initialState, action) {
  switch (action.type) {
    case ActionTypes.TEST:
      return {
        ...state,
        test: action.payload
      };

    default:
      return state;
  }
}
