import React from 'react';
import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid } from '@mui/material';
import ChatList from '../specific/ChatList';
import { sampleChats } from '../constants/sampleData';
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/api/api';
import { LayoutLoaders } from './Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobileMenuFriend } from '../../redux/slices/misc';
import { useErrors } from '../../hooks/hook';

const AppLayout = () => (WrappComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const disptach = useDispatch();

    const { isMobileMenuFriend } = useSelector((store) => store.misc);
    const { isLoading, data, error, isError, refetch } = useMyChatsQuery();

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log('delete chat', _id, groupChat);
    };

    const handleMobileClose = () => disptach(setIsMobileMenuFriend(false));

    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <LayoutLoaders />
        ) : (
          <Drawer open={isMobileMenuFriend} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              onlineUers={[]}
              newMessageAlert={[]}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container height={'calc(100vh-4rem)'}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
            height={'100%'}
          >
            {isLoading ? (
              <LayoutLoaders />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                onlineUers={[]}
                newMessageAlert={[]}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={'100%'}>
            <WrappComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={'92vh'}
            sx={{
              display: { xs: 'none', md: 'block' },
              padding: '2rem',
              backgroundColor: 'rgba(0,0,0,0.85)',
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
