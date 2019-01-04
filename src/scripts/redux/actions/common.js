// here we respond to an action from the UI, process, and dispatch results to handled in reducer
import ActionTypes from "./actionTypes";

export const dataFetch = () => {
  return function(dispatch, state) {
    dispatch({ type: ActionTypes.DATA_FETCH });
    return fetch("/data")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(filterData(json.samples));
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

export const filterData = sampleData => {
  const filteredData = sampleData.filter(data => {
    return (
      data.values.hasOwnProperty("positionLat") &&
      data.values.hasOwnProperty("positionLong")
    );
  });

  return function(dispatch, state) {
    dispatch({
      type: ActionTypes.DATA_FILTERED,
      payload: filteredData
    });
  };
};
