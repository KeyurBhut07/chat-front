import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import {
  Backdrop,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add,
  Delete,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from '../components/styles/StyledComponent';
import AvtarCard from '../components/shared/AvtarCard';
import { sampleChats, sampleUsers } from '../components/constants/sampleData';
import UserIteam from '../components/shared/UserIteam';
import { bgGradiyent } from '../components/constants/color';

// lazy load
const ConfrimDeleteDialog = lazy(() =>
  import('../components/dialogs/ConfrimDeleteDialog')
);
const AddMemberDailog = lazy(() =>
  import('../components/dialogs/AddMemberDailog')
);

// coming from redux
const isAddMember = false;

const Groups = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate('/');
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState('Group Name');
  const [gropNameUpdated, setGroupNameUpdate] = useState();
  const [confirmDeleteDialog, setConfrimDeleteDialog] = useState(false);

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const chatId = useSearchParams()[0].get('group');

  // updating group name
  const updateGroupName = () => {
    setIsEdit(false);
    setGroupName(gropNameUpdated);
  };

  // Add Member
  const openAddMemberHandler = () => {};

  // Delte Froup
  const openConfirmDeleteHandler = () => {
    setConfrimDeleteDialog(true);
  };

  // close Dailog box
  const closeConfirmDeletHandle = () => setConfrimDeleteDialog(false);

  // delete group
  const deleteHandler = () => {};

  // remove memeber handler
  const removeMemberHandler = (id) => {
    console.log(id);
  };

  // JSX Element
  const IconBtns = (
    <>
      <IconButton
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            right: '2rem',
            top: '2rem',
          },
        }}
        onClick={handleMobile}
      >
        <MenuIcon />
      </IconButton>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: 'rgba(0,0,0,0.8)',
            color: 'white',
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.8)',
            },
          }}
          onClick={() => navigateBack()}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  // Group Name JSX element
  const GroupName = (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={'1rem'}
      padding={'3rem'}
      position={'relative'}
    >
      {isEdit ? (
        <>
          <TextField
            value={gropNameUpdated}
            onChange={(e) => setGroupNameUpdate(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  // Button Group
  const ButtonGroup = (
    <Stack
      direction={{
        xs: 'column-reverse',
        sm: 'row',
      }}
      spacing={'1rem'}
      p={{
        xs: '0',
        sm: '1rem',
        md: '1rem 4rem',
      }}
    >
      <Button
        size="large"
        variant="outlined"
        color="error"
        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdate(`Group Name ${chatId}`);
      setIsEdit(false);
    }

    return () => {
      setGroupName('');
      setGroupNameUpdate('');
    };
  }, [chatId]);

  return (
    <Grid container height={'100vh'}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
        // bgcolor={'bisque'}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'table-column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={'2rem'}
              alignSelf={'flex-start'}
              variant="body1"
            >
              Members
            </Typography>
            <Stack
              maxWidth={'45rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{
                sm: '1rem',
                xs: '0',
                md: '1rem 4rem',
              }}
              spacing={'2rem'}
              height={'50vh'}
              overflow={'auto'}
            >
              {/* {members} */}

              {sampleUsers.map((i) => (
                <UserIteam
                  key={i._id}
                  user={i}
                  isAdded
                  styling={{
                    boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {/* handle Dialog Box */}

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDailog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfrimDeleteDialog
            open={confirmDeleteDialog}
            handlerClose={closeConfirmDeletHandle}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          },
        }}
      >
        <GroupsList w={'50vw'} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{ backgroundImage: bgGradiyent, height: '100vh', overflow: 'auto' }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupsListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={'center'} padding={'1rem'}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupsListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={'row'} padding={'10px'} alignItems={'center'}>
        <AvtarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
