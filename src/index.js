import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store"; // Import store
import App from "./App"; // Import the main component
import { BrowserRouter as Router } from "react-router-dom"; // Import Router

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
