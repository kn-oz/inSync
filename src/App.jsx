import { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./State/AuthContext.jsx";
import Profile from "./Routes/Profile.jsx";
import Find from "./Routes/Find.jsx";
import Login from "./Routes/Login.jsx";
import Home from "./Routes/Home.jsx";
import Register from "./Routes/Register.jsx";
import ErrorRoute from "./Routes/ErrorRoute.jsx";
import Connections from "./Routes/Connections.jsx";
import MatchChat from "./Routes/MatchChat.jsx";
import Community from "./Routes/Community.jsx";
import "./index.css";
import "@stream-io/stream-chat-css/dist/css/index.css";
import Onboarding from "./Routes/Onboarding.jsx";

//const filters = { type: 'messaging' };
//const options = { state: true, presence: true, limit: 10 };
//const sort = { last_message_at: -1 };

function App() {
  const { user } = useContext(AuthContext);
  //console.log("logging user from App.jsx", Boolean(Object.keys(user).length));
  //const isUser = Boolean(Object.keys(user).length);
  //console.log(Boolean(user));

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/insync/login"></Navigate>;
    }
    return children;
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/insync/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Find />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="find"
              element={
                <ProtectedRoute>
                  <Find />
                </ProtectedRoute>
              }
            />
            <Route
              path="community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="connections"
              element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }
            />
            <Route
              path="matchChat"
              element={
                <ProtectedRoute>
                  <MatchChat />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<ErrorRoute />} />
          </Route>
          <Route path="/insync/login" element={<Login />} />
          <Route path="/insync/register" element={<Register />} />
          <Route
              path="/insync/onboarding"
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
