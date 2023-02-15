import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChannelList,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
  Chat,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";
import { AuthContext } from "../State/AuthContext.jsx";
import { MatchesActionDispatchContext } from "../State/MatchContext.jsx";

export default function Matches() {
  const { user } = useContext(AuthContext);
  const dispatch = useContext(MatchesActionDispatchContext);
  //console.log("logging user auth data from find component" ,user);

  const [client, setClient] = useState(null);
  let navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    //console.log("use-effect is being called")
    if (user) {
      const getUserData = async () => {
        const userDocSnap = await getDoc(doc(db, "users", user.email));
        //console.log('getting user data effect was called');
        //console.log(userDocSnap.data());
        setUserData(userDocSnap.data());
      };
      getUserData();
    } else {
      setUserData(null);
    }
  }, []);

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

      //console.log("client connected");
    }
    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, [userData]);

  if (!client) return <div>Loading...</div>;

  return (
    <div>
      <Chat client={client} >
        <ChannelList
          filters={{ type: "messaging", members: { $in: [userData.uid] } }}
          sort={{ last_message_at: -1 }}
        />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
