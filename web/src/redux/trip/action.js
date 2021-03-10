export const TRIP_ACTION = {
  GET_TRIP_LIST_REQUEST: 'GET_TRIP_LIST_REQUEST',
  GET_TRIP_LIST_SUCCESS: 'GET_TRIP_LIST_SUCCESS',
  GET_TRIP_LIST_FAILURE: 'GET_TRIP_LIST_FAILURE',

  GET_SUGGESTION_TRIP_REQUEST: 'GET_SUGGESTION_TRIP_REQUEST',
  GET_SUGGESTION_TRIP_SUCCESS: 'GET_SUGGESTION_TRIP_SUCCESS',
  GET_SUGGESTION_TRIP_FAILURE: 'GET_SUGGESTION_TRIP_FAILURE',
};

// get trip list
export const getTripListRequest = (data) => ({
  type: TRIP_ACTION.GET_TRIP_LIST_REQUEST,
  payload: data,
});
export const getTripListSuccess = ({ tripList, metadata }) => ({
  type: TRIP_ACTION.GET_TRIP_LIST_SUCCESS,
  payload: { tripList, metadata },
});
export const getTripListFailure = (error) => ({
  type: TRIP_ACTION.GET_TRIP_LIST_FAILURE,
  payload: error,
});

// get suggestion trip list
export const getSuggestionTripRequest = (data) => ({
  type: TRIP_ACTION.GET_SUGGESTION_TRIP_REQUEST,
  payload: data,
});
export const getSuggestionTripSuccess = ({ suggestionTrips }) => ({
  type: TRIP_ACTION.GET_SUGGESTION_TRIP_SUCCESS,
  payload: { suggestionTrips },
});
export const getSuggestionTripFailure = (error) => ({
  type: TRIP_ACTION.GET_SUGGESTION_TRIP_FAILURE,
  payload: error,
});
