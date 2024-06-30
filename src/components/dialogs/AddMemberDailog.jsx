import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../constants/sampleData';
import UserIteam from '../shared/UserIteam';

const AddMemberDailog = ({ addMember, isLoadinAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // add member submit handler
  const addMemberSubmitHandler = () => {
    closeHandler()
  };

  // close handler
  const closeHandler = () => {
    setSelectedMembers([])
    setMembers([])
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
        <DialogTitle textAlign={'center'}> Add Member</DialogTitle>
        <Stack spacing={'1rem'}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserIteam
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={'center'}>No Friend</Typography>
          )}
        </Stack>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
        >
          <Button color="error" variant="outlined" onClick={closeHandler}>
            Cancle
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadinAddMember}
          >
            Add Member
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDailog;
