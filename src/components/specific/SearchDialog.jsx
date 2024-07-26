import { Search as SearchIcon, StartOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserIteam from '../shared/UserIteam';
import { sampleUsers } from '../constants/sampleData';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/slices/misc';
import { useLazySearchUserQuery } from '../../redux/api/api';

const SearchDialog = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  let isLoadingSendFriendRequest = false;
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  const addFriendHandler = (id) => {
    console.log('id: ', id);
  };

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
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
