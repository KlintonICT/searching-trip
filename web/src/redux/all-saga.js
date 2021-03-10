import { all } from 'redux-saga/effects';

import tripSaga from './trip/saga';

export default function* allSaga() {
  yield all([tripSaga()]);
}
