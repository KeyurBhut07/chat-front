import React, { memo } from 'react';
import { Link } from '../styles/StyledComponent';
import { Box, Stack, Typography } from '@mui/material';
import AvtarCard from './AvtarCard';

const ChatIteam = ({
  avatar = [],
  name,
  _id,
  groupChat,
  sameSender,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChat,
}) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
    handleDeleteChat(e, _id, groupChat);
  };
  return (
    <Link to={`/chat/${_id}`} onContextMenu={handleContextMenu}>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: sameSender ? 'black' : 'unset',
          color: sameSender ? 'white' : 'unset',
          position: 'relative',
          textDecoration: 'none', // Ensure no underline
        }}
      >
        <AvtarCard avatar={avatar}/>
        <Stack>
          <Typography>{name}</Typography>
          {newMessage && (
            <Typography>{newMessage.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'green',
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'tarnslateY(-50%)',
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatIteam);
