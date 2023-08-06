export const setAdminStorage = (admin, storage = 'session') => {
  if (storage === 'session') {
    sessionStorage.setItem('admin', JSON.stringify(admin));
  } else {
    localStorage.setItem('admin', JSON.stringify(admin));
  }
};

export const clearAdmin = () => {
  localStorage.removeItem('admin');
  sessionStorage.removeItem('admin');
};
