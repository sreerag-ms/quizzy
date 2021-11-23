const setToSessionStorage = authDetails => {
  Object.entries(authDetails).forEach(([key, value]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });
};
const getFromSessionStorage = key =>
  JSON.parse(sessionStorage.getItem(key) ?? null);

export { setToSessionStorage, getFromSessionStorage };
