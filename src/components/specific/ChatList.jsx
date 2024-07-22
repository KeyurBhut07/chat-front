import { Stack } from '@mui/material';
import React from 'react';
import ChatIteam from '../shared/ChatIteam';
import { bgGradiyent } from '../constants/color';

const ChatList = ({
  w = '100%',
  chats = [],
  chatId,
  onlineUers = [],
  newMessageAlert = [
    {
      chatId: '',
      count,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction={'column'}
      overflow={'auto'}
      height={'100vh'}
      sx={{
        backgroundImage: bgGradiyent,
      }}
    >
      {chats?.map((data, index) => {
        const { avatar, name, _id, members, groupChat } = data;
        const isOnline = members.some((member) => member.includes(_id));
        const newMessageCount = newMessageAlert.find(
          ({ chatId }) => chatId === _id
        );
        return (
          <ChatIteam
            key={_id}
            newMessage={newMessageCount}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            index={index}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};
export default ChatList;
