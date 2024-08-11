import { Box, Typography } from '@mui/material';
import React, { memo } from 'react';
import { lightBlue } from '../constants/color';
import moment from 'moment';
import { fileFormat } from '../lib/features';
import RenderAttachments from './RenderAttachments';

const MessageComponent = ({ message, user }) => {
  console.log('message: ', message);
  const { sender, attachments = [], content, createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? 'flex-end' : 'flex-start',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '0.5rem',
        width: 'fit-content',
        padding: '0.5rem',
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={'600'} variant="caption">
          {sender?.name}
        </Typography>
      )}

      {/***  Attachment */}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: 'black' }}>
                {RenderAttachments(file, url)}
              </a>
            </Box>
          );
        })}

      {content && <Typography>{content}</Typography>}

      <Typography variant="caption" color={'text.secondary'}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
