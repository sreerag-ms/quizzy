const setToLocalStorage = ({ authToken, email, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("userName", JSON.stringify(userName));
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
