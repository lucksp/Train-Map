// here we respond to an action from the UI, process, and dispatch results to handled in reducer
import ActionTypes from "./ActionTypes";

export const dataFetch = () => {
  return function(dispatch, state) {
    dispatch({ type: ActionTypes.DATA_FETCH });
    return fetch("/data")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        return dispatch({
          type: ActionTypes.DATA_SUCCESS,
          payload: json
        });
      })
      .catch(
        error => {} //dispatch({ type: ActionTypes.DATA_ERROR, payload: error })
      );
  };
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const displaySelectedSegment = between => {
  return function(dispatch, state) {
    dispatch({
      type: ActionTypes.GRAPH_SEGMENT_CLICKED,
      payload: between
    });
  };
};

export const calcBestTimes = times => {
  return function(dispatch, state) {
    dispatch({
      type: ActionTypes.CALC_BEST_EFFORT,
      payload: times
    });
  };
};
