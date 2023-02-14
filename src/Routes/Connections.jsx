import React, { useEffect, useState, useContext } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { StreamChat } from 'stream-chat'
import { Channel, ChannelHeader, MessageList, MessageInput, Thread, Window, Chat } from 'stream-chat-react'
import { useChatContext } from 'stream-chat-react'
import { AuthContext } from '../State/AuthContext.jsx'
import { auth, db } from '../firebase.js'


export default function Connections() {
  console.log('connections was called')
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const { user } = useContext(AuthContext);
  const [userData, setUserData] =useState(null);

  useEffect(() => {
    //console.log("use-effect is being called")
      if (user) {
        const getUserData = async () => {
          const userDocSnap = await getDoc(doc(db, 'users', user.email));
          //console.log('getting user data effect was called');
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

      console.log("client connected");
    }
    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, [userData]);



  useEffect(() => {
    if(client) {
      const newChannel = client.channel('messaging', {
        members: [userData.uid, 'pWXl32VwwPTCMQsXrhh3ignP1yf2'],
        name: `Shivam and Abhishek`,
      });
      console.log("channel created");
      setChannel(newChannel);
    }
  }, [client])

  if (!channel) return <div>Loading...</div>;


  return (
    <div className='chat'>
    <Chat client={client} >
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
  )
}
