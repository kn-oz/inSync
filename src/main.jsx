import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import client from "./query-provider.jsx";
import { AuthProvider } from "./State/AuthContext.jsx";
import App from "./App";
import "./index.css";
import { UserDataProvider } from "./State/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <QueryClientProvider client={client}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
