import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContext from "./context";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
const production = true;
axios.defaults.baseURL = !production
  ? "http://localhost:5001"
  : "https://elliott-project.com:444";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <Router>
    <AppContext>
      <App />
    </AppContext>
  </Router>,
  document.getElementById("root")
);

