import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useUser } from "../State/Hooks";

export default function ChatProvider({ children }) {
  const [userData, setUserData] = useUser();
  const [client, setClient] = useState(null);

  useEffect(() => {
    //console.log("stream useeffect was called")
    const newClient = new StreamChat(import.meta.env.VITE_STREAMAPPKEY);

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    if (userData) {
      newClient.connectUser(
        {
          id: userData.uid,
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

  return (
    <>
      <Chat client={client}>
        {children}
      </Chat>
    </>
  );
}
