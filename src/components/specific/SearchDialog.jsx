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
import React, { useState } from 'react';
import UserIteam from '../shared/UserIteam';
import { sampleUsers } from '../constants/sampleData';

const users = [];

const SearchDialog = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [search, setSearch] = useState();
  const addFriendHandler = (id) => {
    console.log('id: ', id);
  };
  let isLoadingSendFriendRequest = false;
  return (
    <Dialog open>
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
          {users?.map((user) => (
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
