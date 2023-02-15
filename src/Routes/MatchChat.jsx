import React, { useEffect, useState, useContext } from "react";
import { getDoc, doc } from "firebase/firestore";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
  Chat,
} from "stream-chat-react";
import { useChatContext } from "stream-chat-react";
import { AuthContext } from "../State/AuthContext.jsx";
import { auth, db } from "../firebase.js";
import { MatchesDataContext } from "../State/MatchContext.jsx";

export default function MatchChat() {
  //console.log('MatchChat was called')
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const { user } = useContext(AuthContext);
  const { currentMatch: matchData } = useContext(MatchesDataContext);

  //const [filter, setFilter] = useState(null);
  //const [sort, setSort] = useState(null);

  //console.log('logging match data from MatchChat component', matchData);

  const [userData, setUserData] = useState(null);

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
  //console.log("logging userData from home.jsx", userData);
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
          name: `${userData.firstName} ${userData.lastName}`,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
        userData.chatToken
      );

      //console.log("client connected");
      //setFilter( { type: "messaging", members: { $in: [userData.uid] } });
      //setSort( { last_message_at: -1 });
    }
    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, [userData]);

  useEffect(() => {
    if (client) {
      const newChannel = client.channel("messaging", {
        members: [userData.uid, matchData.uid],
        name: `${userData.firstName} and ${matchData.firstName}`,
      });
      //console.log("channel created");
      setChannel(newChannel);
    }
  }, [client]);

  if (!channel) return <div>Loading...</div>;

  return (
    <div className="chat">
      <Chat client={client}>
        <Channel channel={channel}>
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
