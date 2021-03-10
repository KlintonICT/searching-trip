import { TRIP_ACTION } from './action';
import StateUtil from '../../utils/redux-state-util';

const initialState = {
  tripList: [],
  isLoadingTripList: false,
  isErrorTripList: false,

  suggestionTrips: [],
  isLoadingSuggestionTrip: false,
  isErrorSuggestionTrip: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRIP_ACTION.GET_TRIP_LIST_REQUEST:
      return StateUtil.setRequest('TripList', {
        ...state,
        ...action.payload,
      });

    case TRIP_ACTION.GET_TRIP_LIST_SUCCESS:
      return StateUtil.setSuccess('TripList', {
        ...state,
        ...action.payload,
      });

    case TRIP_ACTION.GET_TRIP_LIST_FAILURE:
      return StateUtil.setFailure('TripList', {
        ...state,
        ...action.payload,
      });

    case TRIP_ACTION.GET_SUGGESTION_TRIP_REQUEST:
      return StateUtil.setRequest('SuggestionTrip', {
        ...state,
        ...action.payload,
      });

    case TRIP_ACTION.GET_SUGGESTION_TRIP_SUCCESS:
      return StateUtil.setSuccess('SuggestionTrip', {
        ...state,
        ...action.payload,
      });

    case TRIP_ACTION.GET_SUGGESTION_TRIP_FAILURE:
      return StateUtil.setFailure('SuggestionTrip', {
        ...state,
        ...action.payload,
      });

    default:
      return state;
  }
};
