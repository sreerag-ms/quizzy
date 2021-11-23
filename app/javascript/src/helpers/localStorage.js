const setToLocalStorage = authDetails => {
  Object.entries(authDetails).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};

const getFromLocalStorage = key => {
  let item = null;
  try {
    item = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    logger.error(error);
    localStorage.setItem(key, JSON.stringify(null));
  }
  return item;
};
export { setToLocalStorage, getFromLocalStorage };
