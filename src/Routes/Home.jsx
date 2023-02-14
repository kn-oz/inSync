import React, { useContext, useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AuthContext } from "../State/AuthContext";

export default function Home({ children }) {
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
