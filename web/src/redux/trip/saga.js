import { call, put, takeLatest } from 'redux-saga/effects';
import {
  TRIP_ACTION,
  getTripListSuccess,
  getTripListFailure,
  getSuggestionTripSuccess,
  getSuggestionTripFailure,
} from './action';
import TRIP_API from '../../api/trip';

export default function* tripSaga() {
  yield takeLatest(TRIP_ACTION.GET_TRIP_LIST_REQUEST, getTripList);
  yield takeLatest(TRIP_ACTION.GET_SUGGESTION_TRIP_REQUEST, suggestionTrip);
}

function* getTripList(action) {
  try {
    const data = action.payload;
    const response = yield call(TRIP_API.getTripList, data);
    const { tripList, metadata } = response.data;

    yield put(getTripListSuccess({ tripList, metadata }));
  } catch (error) {
    console.log('Getting trip list error', error);
    yield put(getTripListFailure(error));
  }
}

function* suggestionTrip(action) {
  try {
    const data = action.payload;
    const response = yield call(TRIP_API.suggestionTrip, data);
    const { suggestionTrips } = response.data;

    yield put(getSuggestionTripSuccess({ suggestionTrips }));
  } catch (error) {
    console.log('Getting suggestion trip list error', error);
    yield put(getSuggestionTripFailure(error));
  }
}
