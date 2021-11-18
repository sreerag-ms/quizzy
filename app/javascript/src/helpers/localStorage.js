const setToLocalStorage = ({
  authToken,
  email,
  userName,
  userRole = "standard",
}) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("userName", JSON.stringify(userName));
  localStorage.setItem("userRole", JSON.stringify(userRole));
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
