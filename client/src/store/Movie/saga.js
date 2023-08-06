import { put, takeEvery, call } from 'redux-saga/effects';

import * as apis from '../../network/apis/movie';
import {
  getAvailableSeatsResponse,
  getCancelReservationSeatResponse,
  getMovieDetailsResponse,
  getMoviesListResponse,
  getReservationSeatResponse,
} from './slice';
import { showSnackMsg } from '../../utils/Helpers';
import { setCanShowEmptyState, setSkeletonObject } from '../Loader/slice';
import { Movie } from '../../models/movie.model';

export function* getMoviesListSaga({ payload }) {
  try {
    yield put(getMoviesListResponse({}));
    yield put(setSkeletonObject({ field: 'table', value: true }));
    const response = yield call(apis.getMovies, payload);
    const movies = Movie.setMovies(response.data?.data);
    yield put(getMoviesListResponse({ movies }));
    yield put(setSkeletonObject({ field: 'table', value: false }));
    if (movies.length === 0) {
      yield put(setCanShowEmptyState(true));
    } else {
      yield put(setCanShowEmptyState(false));
    }
  } catch (err) {
    yield put(setSkeletonObject({ field: 'table', value: false }));
    yield put(setCanShowEmptyState(true));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* getMovieDetailsSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'profile', value: true }));
    const response = yield call(apis.getMovieDetails, payload);
    const movie = Movie.setMovie(response.data?.data);
    yield put(getMovieDetailsResponse(movie));
    yield put(setSkeletonObject({ field: 'profile', value: false }));
    if (!movie) {
      yield put(setCanShowEmptyState(true));
    } else {
      yield put(setCanShowEmptyState(false));
    }
  } catch (err) {
    yield put(setSkeletonObject({ field: 'profile', value: false }));
    yield put(setCanShowEmptyState(true));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* getAvailableSeatsSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'seats', value: true }));
    const response = yield call(apis.getAvailableSeats, payload);
    const seats = Movie.setMovie(response.data?.movie);
    yield put(getAvailableSeatsResponse(seats));
    yield put(setSkeletonObject({ field: 'seats', value: false }));
    yield showSnackMsg(response?.data?.message, 'success');
  } catch (err) {
    yield put(setSkeletonObject({ field: 'seats', value: false }));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* getCancelReservationSeatSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'cancelSeat', value: true }));
    const response = yield call(apis.getCancelSeat, payload.id);
    if (response?.data?.isSuccess) {
      yield put(getCancelReservationSeatResponse(true));
      yield put(setSkeletonObject({ field: 'cancelSeat', value: false }));
      yield showSnackMsg(response?.data?.message, 'success');
      yield payload.navigate('/movies');
    } else {
      yield put(getCancelReservationSeatResponse(false));
    }
  } catch (err) {
    yield put(setSkeletonObject({ field: 'cancelSeat', value: false }));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* getReservationSeatSaga({ payload }) {
  try {
    yield put(setSkeletonObject({ field: 'bookSeat', value: true }));
    const response = yield call(apis.getBookDetails, payload);
    yield put(getReservationSeatResponse(true));
    yield put(setSkeletonObject({ field: 'bookSeat', value: false }));
    yield showSnackMsg(response?.data?.message, 'success');
    yield payload.navigate('/movies');
  } catch (err) {
    yield put(setSkeletonObject({ field: 'bookSeat', value: false }));
    yield showSnackMsg(err.response?.data?.message);
  }
}

export default function* MovieSagas() {
  yield takeEvery('movie/getMoviesListRequest', getMoviesListSaga);
  yield takeEvery('movie/getMovieDetailsRequest', getMovieDetailsSaga);
  yield takeEvery('movie/getAvailableSeatsRequest', getAvailableSeatsSaga);
  yield takeEvery('movie/getCancelReservationSeatRequest', getCancelReservationSeatSaga);
  yield takeEvery('movie/getReservationSeatRequest', getReservationSeatSaga);
}
