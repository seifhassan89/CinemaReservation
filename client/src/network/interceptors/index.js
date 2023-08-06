import store from '../../store';
import { showHideLoader } from '../../store/Loader/slice';
import { loginResponse } from '../../store/Auth/slice';
import { clearAdmin } from '../../utils/Auth';
import { showSnackMsg } from '../../utils/Helpers';
import messages from '../../assets/locales/messages';

export const isHandlerEnabled = (config = {}) => {
  return Object.prototype.hasOwnProperty.call(config, 'handlerEnabled') && !config.handlerEnabled ? false : true;
};

// This is used to handle remove loader only if all pending requests are resolved
let numberOfAjaxCAllPending = 0;

export const requestHandler = (request) => {
  numberOfAjaxCAllPending++;
  if (isHandlerEnabled(request)) {
    // show loader if not showing skeleton
    const state = store.getState();
    !Object.values(state.loader.skeletonObject).some((val) => val) && store.dispatch(showHideLoader(true));
  }
  return request;
};

export const successHandler = (response) => {
  numberOfAjaxCAllPending--;
  if (isHandlerEnabled(response)) {
    if (numberOfAjaxCAllPending === 0) {
      store.dispatch(showHideLoader(false));
    }
  }
  return response;
};

export const errorHandler = (error) => {
  const locale = localStorage.getItem('locale');
  if (error.message === 'Network Error') {
    showSnackMsg(locale ? messages[locale].shared.networkError : error.message);
  }
  numberOfAjaxCAllPending--;
  if (isHandlerEnabled(error.config)) {
    if (numberOfAjaxCAllPending === 0) {
      store.dispatch(showHideLoader(false));
    }
  }
  if (error.response.status === 401) {
    store.dispatch(loginResponse({}));
    clearAdmin();
  }
  return Promise.reject({ ...error });
};
