import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import axios from "axios";
window.axios = axios;

ReactDOM.render(<App />, document.getElementById("root"));

(async () => {
  let res = await axios.get("http://localhost:3000", {
    auth: {
      username: "bob",
      password: "password"
    }
  });

  console.log("res", res);
})();
