import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContext from "./context";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.render(
  <Router>
    <AppContext>
      <App />
    </AppContext>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
