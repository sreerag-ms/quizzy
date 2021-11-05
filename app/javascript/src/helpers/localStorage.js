const setToLocalStorage = ({ authToken, email, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("userName", JSON.stringify(userName));
};

const getFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

export { setToLocalStorage, getFromLocalStorage };
