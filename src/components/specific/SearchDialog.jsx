import { Search as SearchIcon } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from '../../hooks/hook';
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from '../../redux/api/api';
import { setIsSearch } from '../../redux/slices/misc';
import UserIteam from '../shared/UserIteam';

const SearchDialog = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState('');

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  const addFriendHandler = async (id) => {
    await sendFriendRequest('Sending friend request...!', { userId: id });
  };

  // searching user
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search)
        .then(({ data }) => {
          setUsers(data?.users);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField
          id=""
          label=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.length > 0 &&
            users?.map((user) => (
              <UserIteam
                key={user._id}
                user={user}
                handler={() => addFriendHandler(user?._id)}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
