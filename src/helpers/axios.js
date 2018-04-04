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

export const saveAuth = auth => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const logout = () => axios.post(URLS.LOGOUT);
