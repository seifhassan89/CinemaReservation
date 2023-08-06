import { all } from 'redux-saga/effects';

import AuthSagas from './Auth/saga';
import MovieSagas from './Movie/saga';
import LookupsSagas from './Lookups/saga';

export default function* rootSaga() {
  yield all([AuthSagas(), MovieSagas(), LookupsSagas()]);
}
