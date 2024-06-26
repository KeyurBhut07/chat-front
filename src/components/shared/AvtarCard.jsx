import { Avatar, AvatarGroup, Box, Stack } from '@mui/material';
import React from 'react';

// To Do transform
const AvtarCard = ({ avatar = [], mx = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup>
        <Box height={'3rem'} width={'5rem'}>
          {avatar.map((i, index) => (
            <Avatar
              src={i}
              key={Math.random() * 100}
              alt={"profile"}
              style={{
                width: '3rem',
                height: '3rem',
                position: 'absolute',
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${index}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvtarCard;
