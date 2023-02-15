import { createContext, useEffect, useState, useContext } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from "../firebase";


export const AuthContext = createContext(null);
export const UserDataContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  console.log("auth provider mounted")
  console.log("logging current user", currentUser);
  useEffect(() => {
    //console.log("useeffect is being called")
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>{children}</AuthContext.Provider>
  );
}
