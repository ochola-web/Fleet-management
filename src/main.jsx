import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { RouteProvider } from "./context/RouteContext"; // ✅ import RouteProvider
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ✅ Wrap App inside RouteProvider */}
      <RouteProvider>
        <App />
      </RouteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
