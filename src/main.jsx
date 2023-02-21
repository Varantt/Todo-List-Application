import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/app.css";
import { Provider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
