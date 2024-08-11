import { useInfiniteScrollTop } from '6pp';
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { grayColor } from '../components/constants/color';
import { NEW_MESSAGE } from '../components/constants/events';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import { LayoutLoaders } from '../components/layout/Loaders';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponent';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { getSocket } from '../socket';
import { setIsFileMenu } from '../redux/slices/misc';

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
  const dispatch = useDispatch();

  const [message, setMessage] = useState();
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  // set messages
  const [messages, setMessages] = useState([]);

  // get chat details
  const chatDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  // get chat message
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const members = chatDetails.data?.chat?.members;

  // infinite scroll
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  // show error
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // file handler
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

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

  const allMessages = [...oldMessages, ...messages];

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
          {allMessages.length > 0 &&
            allMessages.map((i) => (
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
              onClick={handleFileOpen}
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
        <FileMenu ancoreE1={fileMenuAnchor} chatId={chatId} />
      </Fragment>
    </>
  );
};

export default AppLayout()(Chat);
