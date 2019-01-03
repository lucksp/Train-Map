// here we respond to an action from the UI, process, and dispatch results to handled in reducer
import ActionTypes from "./actionTypes";

export const dataFetch = () => ({
  type: ActionTypes.DATA_FETCH
});
