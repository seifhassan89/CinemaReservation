import store from '../store';
import { showHideSnackbar } from '../store/Snackbar/slice';

export const showSnackMsg = (message, type = 'error') => {
  if (message) {
    store.dispatch(
      showHideSnackbar({
        isOpen: true,
        type,
        message,
      })
    );
  }
};
