import { call, put, takeEvery } from 'redux-saga/effects';

import * as apis from '../../network/apis/lookups';
import { showSnackMsg } from '../../utils/Helpers';
import { setSkeletonObject } from '../Loader/slice';
import { getHallsResponse, getPartyTimesResponse, getReservationsFilteredResponse, getSeatsResponse } from './slice';

export function* getHallsSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'halls', value: true }));
    const response = yield call(apis.getHalls, payload);
    yield put(getHallsResponse(response?.data?.data));
    yield put(setSkeletonObject({ field: 'halls', value: false }));
  } catch (err) {
    yield put(setSkeletonObject({ field: 'halls', value: false }));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* getPartyTimesSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'partyTimes', value: true }));
    const response = yield call(apis.getPartyTimes, payload);
    yield put(getPartyTimesResponse(response?.data?.data));
    yield put(setSkeletonObject({ field: 'partyTimes', value: false }));
  } catch (err) {
    yield put(setSkeletonObject({ field: 'partyTimes', value: false }));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* getSeatsSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'seats', value: true }));
    const response = yield call(apis.getSeats, payload);
    yield put(getSeatsResponse(response?.data?.data));
    yield put(setSkeletonObject({ field: 'seats', value: false }));
  } catch (err) {
    yield put(setSkeletonObject({ field: 'seats', value: false }));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* getReservationsFilteredSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'reservedSeat', value: true }));
    const response = yield call(apis.getReservedSeat, payload);
    yield put(getReservationsFilteredResponse(response?.data));
    yield put(setSkeletonObject({ field: 'reservedSeat', value: false }));
  } catch (err) {
    yield put(setSkeletonObject({ field: 'reservedSeat', value: false }));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export default function* LookupsSagas() {
  yield takeEvery('lookups/getHallsRequest', getHallsSaga);
  yield takeEvery('lookups/getPartyTimesRequest', getPartyTimesSaga);
  yield takeEvery('lookups/getSeatsRequest', getSeatsSaga);
  yield takeEvery('lookups/getReservationsFilteredRequest', getReservationsFilteredSaga);
}
