import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Channel, ChannelHeader, MessageList, MessageInput, Thread, Window } from 'stream-chat-react'
import { useChatContext } from 'stream-chat-react'
import { UserDataContext } from '../State/AuthContext.jsx'


export default function Connections() {
  console.log('connections was called')
  const { userData } = useContext(UserDataContext);
  const {client } = useChatContext();
  
  console.log(userData);

  const channel = client.channel('messaging', {
    members: [userData.firstName, 'itachi'],
    id: `${userData.firstName} and itachi`,
    name: `${userData.firstName} and itachi`,
  });

  return (
    <div className='chat'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  )
}
