import React, { useContext, useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from "../firebase";
import { AuthContext } from "../State/AuthContext";

export default function Home({children}) {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] =useState(null);

  useEffect(() => {
    //console.log("use-effect is being called")
      if (user) {
        const getUserData = async () => {
          const userDocSnap = await getDoc(doc(db, 'users', user.email));
          console.log('getting user data effect was called');
          //console.log(userDocSnap.data());
            setUserData(userDocSnap.data());
        };
        getUserData();
      } else {
        setUserData(null);
      }
      
    //return () => unsub();
  }, []);
  //console.log("logging userData from home.jsx", userData);

  return (
    
      <div>
        <div className="root">
          <nav className="navigation-menu p-1 sticky top-1 left-1">
            <ul className="menu menu-horizontal bg-secondary text-secondary-content rounded-box">
              <li>
                <Link to={"/insync/profile"}>Profile</Link>
              </li>
              <li>
                <Link to={"/insync/find"}>Find</Link>
              </li>
              <li>
                <Link to={"/insync/community"}>Comm</Link>
              </li>
              <li>
                <Link to={"/insync/connections"}>Matches</Link>
              </li>
              <li>
                <button onClick={() => signOut(auth)}>Log Out</button>
              </li>
            </ul>
          </nav>
          {children}
        </div>
        <Outlet />
      </div>
  );
}
