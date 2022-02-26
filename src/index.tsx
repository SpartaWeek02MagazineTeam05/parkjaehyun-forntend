import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Shimmer from "./Shimmer";

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <RecoilRoot>

      
      <App />

    </RecoilRoot>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
