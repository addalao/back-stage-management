import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import history from "./history";

// axios.defaults.baseURL = "http://192.168.3.244:3000";
axios.defaults.baseURL = "/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      message.error("登录失效，请重新登录");
      localStorage.clear();
      history.replace("/login");
    } else {
      message.error(error.response.data.message[0]);
    }

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
