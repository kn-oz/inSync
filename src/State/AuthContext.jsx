import { createContext, useEffect, useState } from "react";
import {onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from "../firebase";


export const AuthContext = createContext(null);
export const UserDataContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
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


export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUserData = async () => {
          const userDocSnap = await getDoc(doc(db, 'users', user.email));
          console.log('getting user data effect was called');
          console.log(userDocSnap.data());
            setUserData(userDocSnap.data());
        };
        getUserData();
      } else {
        setUserData(null);
      }
      });
    return () => unsub();
  }, []);
  

  return (
    <UserDataContext.Provider value={{ userData }}>{children}</UserDataContext.Provider>
  );
}