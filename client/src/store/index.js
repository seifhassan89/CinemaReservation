import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import appHelpersReducer from './AppHelpers/slice';
import authReducer from './Auth/slice';
import loaderReducer from './Loader/slice';
import localeReducer from './Locale/slice';
import lookupsReducer from './Lookups/slice';
import movieReducer from './Movie/slice';
import snackbarReducer from './Snackbar/slice';
import rootSaga from './sagas';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    locale: localeReducer,
    appHelpers: appHelpersReducer,
    lookups: lookupsReducer,
    movie: movieReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);

export default store;
