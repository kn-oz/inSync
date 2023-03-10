import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./State/AuthContext.jsx";
import { MatchProvider } from "./State/MatchContext.jsx";
import App from "./App";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MatchProvider>
        <App />
      </MatchProvider>
    </AuthProvider>
  </React.StrictMode>
);
