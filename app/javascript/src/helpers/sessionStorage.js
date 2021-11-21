const setToSessionStorage = ({ authToken, email, userName }) => {
  sessionStorage.setItem("authToken", JSON.stringify(authToken));
  sessionStorage.setItem("authEmail", JSON.stringify(email));
  sessionStorage.setItem("userName", JSON.stringify(userName));
};
const getFromSessionStorage = key =>
  JSON.parse(sessionStorage.getItem(key) ?? null);

export { setToSessionStorage, getFromSessionStorage };
