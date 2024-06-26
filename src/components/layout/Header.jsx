import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { Suspense, lazy, useState } from 'react';
import { orange } from '../constants/color';
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchDialog = lazy(() => import('../specific/SearchDialog'));
const NotificationsDialog = lazy(() =>
  import('../specific/NotificationsDialog')
);
const NewGroupsDialog = lazy(() => import('../specific/NewGroupsDialog'));

const Header = () => {
  const navigate = useNavigate();

  const [isSearch, setIsSearch] = useState(false);
  const [notification, setNotifications] = useState(false);
  const [newGroups, setNewGroups] = useState(false);

  const handleMobile = () => {
    console.log('Mobile');
  };
  const openSearchDialog = () => {
    setIsSearch(!isSearch);
  };

  const openNewGroups = () => {
    setNewGroups(!newGroups)
  };

  const openNotification = () => {
    setNotifications(!notification);
  };

  const navigateToGroup = () => navigate('/groups');

  const logoutHandler = () => {
    console.log('logoutHandler ');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              AK Chat
            </Typography>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box flexGrow={1} />
            <Box>
              <IconBtn
                title={'notification'}
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconBtn
                title={'search'}
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />
              <IconBtn
                title={'New Group'}
                icon={<AddIcon />}
                onClick={openNewGroups}
              />
              <IconBtn
                title={'Manage Groups'}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={'Logout'}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {notification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}
      {newGroups && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupsDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
