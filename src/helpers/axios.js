import axios from "axios";
import { URLS } from "constants/index";

const auth =
  (() => {
    try {
      return JSON.parse(localStorage.getItem("auth"));
    } catch (e) {
      return {};
    }
  })() || {};

axios.defaults.auth = {
  username: auth.username,
  password: auth.password
};

export default axios;

export const updateAuth = auth => {
  axios.defaults.auth = auth;
  return axios;
};

export const saveAuth = (auth, update = false) => {
  localStorage.setItem("auth", JSON.stringify(auth));
  if (update) {
    updateAuth(auth);
  }
};

export const logout = () => axios.post(URLS.LOGOUT);
