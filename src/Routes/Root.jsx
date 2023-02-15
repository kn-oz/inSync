import React, { useContext, useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { UserDataContext } from "../State/AuthContext";

export default function Root({ children }) {
  const [client, setClient] = useState(null);
  const { userData } = useContext(UserDataContext);
  console.log("logging userData from home.jsx", userData);
  useEffect(() => {
    const newClient = new StreamChat("8fy6kehyvp26");

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    if (userData) {
      newClient.connectUser(
        {
          id: userData.uid,
          name: `${userData.firstName} ${userData.lastName}`,
        },
        userData.chatToken
      );

      console.log("client connected");
    }
    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, [userData]);

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <div className="root">
        <nav className="navigation-menu p-1 sticky top-1 left-1">
          <ul className="menu menu-horizontal bg-secondary text-secondary-content rounded-box">
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/find"}>Find</Link>
            </li>
            <li>
              <Link to={"/community"}>Comm</Link>
            </li>
            <li>
              <Link to={"/MatchChat"}>Matches</Link>
            </li>
            <li>
              <button onClick={() => signOut(auth)}>Log Out</button>
            </li>
          </ul>
        </nav>
        {children}
      </div>
    </Chat>
  );
}
