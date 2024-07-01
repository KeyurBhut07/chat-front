import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import React, { useState } from 'react'
import { grayColor } from '../constants/color'
import {
  Chat,
  Close,
  Dashboard,
  ExitToApp,
  Group,
  ManageAccounts,
  Menu as MenuIcon,
  Message,
} from '@mui/icons-material'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'
// import {  } from '../styles/StyledComponent'

const Link = styled(LinkComponent)({
  textDecoration: 'none',
  color: 'black',
  borderRadius: '2rem',
  padding: '1rem 2rem',
  '&:hover': {
    color: 'rgba(0, 0, 0, 0.54)',
  },
})
const adminTabs = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <Dashboard />,
  },
  {
    name: 'Users',
    path: '/admin/user-managment',
    icon: <ManageAccounts />,
  },
  {
    name: 'Chats',
    path: '/admin/group-management',
    icon: <Group />,
  },
  {
    name: 'Messages',
    path: '/admin/messages',
    icon: <Message />,
  },
]

const Sidebar = ({ w = '100%' }) => {
  const loaction = useLocation()
  const handleLogout = () => {
    console.log('logout')
  }
  return (
    <Stack width={w} direction={'column'} p={'3rem'} spacing={'3rem'}>
      <Typography variant="h4" textTransform={'uppercase'}>
        AK
      </Typography>
      <Stack spacing={'1rem'}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: 'black',
                color: 'white',
                ':hover': { color: 'white' },
              }
            }
          >
            <Stack direction={'row'} alignItems={'center'} spacing={'3rem'}>
              {tab.icon}
              <Typography variant="h6">{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={handleLogout}>
          <Stack direction={'row'} alignItems={'center'} spacing={'3rem'}>
            <ExitToApp />
            <Typography variant="h6">Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  )
}

const isAdmin = true

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const handleMobile = () => {
    setIsMobile(!isMobile)
  }
  const handleClose = () => setIsMobile(false)

  // handle Admin
  if (!isAdmin) return <Navigate to={'/login'} />
  return (
    <Grid container minHeight={'100vh'}>
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
          position: 'fixed',
          right: '1rem',
          top: '1rem',
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: grayColor }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w={'50vw'} />
      </Drawer>
    </Grid>
  )
}

export default AdminLayout
