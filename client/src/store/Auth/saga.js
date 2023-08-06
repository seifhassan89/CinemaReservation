import { put, takeEvery } from 'redux-saga/effects';

import { Admin } from '../../models/admin.model';
import { clearAdmin, setAdminStorage } from '../../utils/Auth';
import { showSnackMsg } from '../../utils/Helpers';
import { ROUTES_PATHS } from '../../utils/RoutesPaths';
import { loginResponse, logoutResponse } from './slice';

export function* loginSaga({ payload }) {
  try {
    if (payload.data?.email) {
      const admin = Admin.setAdmin(payload.data);
      yield put(loginResponse(admin));
      yield setAdminStorage(admin, payload.data?.rememberMe ? 'local' : 'session');
      yield payload.navigate(ROUTES_PATHS.movies);
    } else {
      yield showSnackMsg('please enter valid email');
    }
  } catch (err) {
    yield showSnackMsg(err.response?.data?.message);
  }
}

export function* logoutSaga({ payload }) {
  try {
    yield put(logoutResponse());
    yield clearAdmin();
    yield payload.navigate(ROUTES_PATHS.login);
  } catch (err) {
    yield showSnackMsg(err.response?.data?.message);
  }
}

export default function* AuthSagas() {
  yield takeEvery('auth/loginRequest', loginSaga);
  yield takeEvery('auth/logoutRequest', logoutSaga);
}
