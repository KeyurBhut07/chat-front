import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import React, { memo } from 'react';
import { sampleNotifications } from '../constants/sampleData';
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from '../../redux/api/api';
import { useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/slices/misc';
import toast from 'react-hot-toast';

const NotificationsDialog = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const { data, isLoading, error, isError } = useGetNotificationsQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(setIsNotification(false));
  };
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log('use Socket handler');
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.error || 'Something went wrong');
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error('Something went wrong');
    }
  };

  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: '1rem', sm: '2rem' }} width={'25rem'}>
        <DialogTitle textAlign={'center'}>Notifications</DialogTitle>
        {isLoading ? (
          <p>loading....</p>
        ) : (
          <>
            {data?.notifications.length > 0 ? (
              data?.notifications.map(({ sender, _id }) => (
                <NotificationIteams
                  key={_id}
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={'center'}> 0 Notifications </Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationIteams = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexFlow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {`${name} sent you friend request.`}
        </Typography>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default NotificationsDialog;
