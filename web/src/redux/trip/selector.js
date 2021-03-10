import { createSelector } from 'reselect';

const tripReducerSelector = (state) => state.tripReducer;

export const getTripListSelector = createSelector(
  tripReducerSelector,
  ({ tripList, metadata, isLoadingTripList, isErrorTripList }) => ({
    tripList,
    metadata,
    isLoadingTripList,
    isErrorTripList,
  })
);

export const getSuggestionTripSelector = createSelector(
  tripReducerSelector,
  ({ suggestionTrips, isLoadingSuggestionTrip, isErrorSuggestionTrip }) => ({
    suggestionTrips,
    isLoadingSuggestionTrip,
    isErrorSuggestionTrip,
  })
);
