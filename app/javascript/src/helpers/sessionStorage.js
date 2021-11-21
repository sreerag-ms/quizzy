const setToSessionStorage = ({
  authToken,
  email,
  userName,
  userRole = "standard",
}) => {
  sessionStorage.setItem("authToken", JSON.stringify(authToken));
  sessionStorage.setItem("authEmail", JSON.stringify(email));
  sessionStorage.setItem("userName", JSON.stringify(userName));
  sessionStorage.setItem("userRole", JSON.stringify(userRole));
};
const getFromSessionStorage = key =>
  JSON.parse(sessionStorage.getItem(key) ?? null);

export { setToSessionStorage, getFromSessionStorage };
