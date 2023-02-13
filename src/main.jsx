import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./State/AuthContext.jsx";
import App from "./App";
import Root from "./Routes/Root.jsx";
import Error from "./Error.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
