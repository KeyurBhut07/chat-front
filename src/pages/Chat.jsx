import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { grayColor } from '../components/constants/color';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponent';
import { orange } from '@mui/material/colors';
import FileMenu from '../components/dialogs/FileMenu';
import {
  samapleMessage,
  sampleChats,
} from '../components/constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../components/constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { LayoutLoaders } from '../components/layout/Loaders';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useSelector } from 'react-redux';

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);

  // get current user
  const users = useSelector((store) => store.auth);
  const user = {
    _id: users?.user._id,
    name: users?.user.name,
  };

  // get socket connection
  const socket = getSocket();

  const [message, setMessage] = useState();
  const [page, setPage] = useState(1);
  // set messages
  const [messages, setMessages] = useState([]);

  // get chat details
  const chatDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  // get chat message
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  console.log('oldMessagesChunk: ', oldMessagesChunk.data);

  const members = chatDetails.data?.chat?.members;
  // show error
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // message trigger
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Emittin message to server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage('');
  };

  // listing the event
  const newMessageEventlisten = useCallback((data) => {
    setMessages((prevMessages) => [...prevMessages, data.message]);
  }, []);
  const eventHandlers = {
    [NEW_MESSAGE]: newMessageEventlisten,
  };

  // event hook
  useSocketEvents(socket, eventHandlers);
  useErrors(errors);

  return chatDetails.isLoading ? (
    <LayoutLoaders />
  ) : (
    <>
      <Fragment>
        <Stack
          ref={containerRef}
          boxSizing={'border-box'}
          padding={'1rem'}
          spacing={'1rem'}
          bgcolor={grayColor}
          height={'80vh'}
          sx={{
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          {/* message  */}
          {!oldMessagesChunk.isLoading &&
            oldMessagesChunk.data?.messages.map((i) => (
              <MessageComponent key={i._id} message={i} user={user} />
            ))}
          {messages.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))}
        </Stack>
        <form
          style={{
            height: '9vh',
          }}
          onSubmit={submitHandler}
        >
          <Stack
            direction={'row'}
            height={'100%'}
            padding={'1rem'}
            alignItems={'center'}
            position={'relative'}
          >
            <IconButton
              sx={{
                position: 'absolute',
                left: '1.5rem',
                rotate: '30deg',
              }}
            >
              <AttachFileIcon />
            </IconButton>
            <InputBox
              placeholder="Type Message Here...."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton
              type="submit"
              sx={{
                rotate: '-40  deg',
                backgroundColor: 'orange',
                color: 'white',
                marginLeft: '2rem',
                padding: '0.5rem',
                '&:hover': {
                  backgroundColor: 'error.dark',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
        <FileMenu />
      </Fragment>
    </>
  );
};

export default AppLayout()(Chat);
