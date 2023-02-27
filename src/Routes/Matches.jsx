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
import { useUser } from "../State/Hooks.js";

export default function Matches() {

  const [userData, setUserData] = useUser();
  //const dispatch = useContext(MatchesActionDispatchContext);
  //console.log("logging user auth data from find component" ,user);

  const [client, setClient] = useState(null);
  let navigate = useNavigate();

  const [channels, setChannels] = useState(null);

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

  useEffect(() => {
    const getChannels = async () => {
      const filters = { type: "messaging", members: { $in: [userData.uid] } };
      const sort = { last_message_at: -1 };
      const channelList = await client.queryChannels(filters, sort, {
        watch: true,
        state: true,
      });
      setChannels(channelList);
      console.log(channelList);
    }

    //getChannels();
    
  }, [client]);

  if (!client) return <div>Loading...</div>;

  return (
    <div className="">
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
