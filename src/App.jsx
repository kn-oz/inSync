import { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./State/AuthContext.jsx";
import Profile from "./Routes/Profile.jsx";
import Find from "./Routes/Find.jsx";
import Login from "./Routes/Login.jsx";
import Home from "./Routes/Home.jsx";
import Register from "./Routes/Register.jsx";
import ErrorRoute from "./Routes/ErrorRoute.jsx";
import MatchChat from "./Routes/MatchChat.jsx";
import Matches from "./Routes/Matches.jsx";
import Community from "./Routes/Community.jsx";
import EditProfile from "./Routes/EditProfile.jsx";
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
      return <Navigate to="/login"></Navigate>;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
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
            path="edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
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
          <Route path="*" element={<ErrorRoute />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/match-chat"
          element={
            <ProtectedRoute>
              <MatchChat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
