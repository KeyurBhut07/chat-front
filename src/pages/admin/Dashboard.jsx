import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import {
  AdminPanelSettings,
  Group,
  Notifications,
  Person,
} from '@mui/icons-material'
import moment from 'moment'
import {
  CurveButton,
  SearchField,
} from '../../components/styles/StyledComponent'

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        margin: '2rem 0',
        borderRadius: '1rem',
      }}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettings sx={{ fontSize: '3rem' }} />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: 'none',
            lg: 'block',
          }}
          color={'rgba(0,0,0,0.7)'}
          textAlign={'center'}
        >
          {moment().format('dddd, D MMMM YYYY')}
        </Typography>
        <Notifications sx={{ fontSize: '3rem' }} />
      </Stack>
    </Paper>
  )

  // Widgets
  const Widgets = (
    <>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
      >
        ad
      </Stack>
    </>
  )
  return (
    <>
      <AdminLayout>
        <Container component={'main'}>
          {Appbar}

          {/* chart area */}
          <Stack direction={'row'} spacing={'2rem'} flexWrap={'wrap'}>
            <Paper
              elevation={3}
              sx={{
                padding: '2rem 3.5rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '45rem',
                height: '25rem',
              }}
            >
              <Typography variant="h4" margin={'2rem 0'}>
                Last Messages
              </Typography>
              {'Chats'}
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: '1rem',
                borderRadius: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: '50%' },
                position: 'relative',
                maxWidth: '25rem',
                height: '25rem',
              }}
            >
              {'Dougnut chart'}

              <Stack
                position={'absolute'}
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={'0.5rem'}
                width={'100%'}
                height={'100%'}
              >
                <Group /> <Typography>Vs</Typography> <Person />
              </Stack>
            </Paper>
          </Stack>

          {/* Widgets */}
          {Widgets}
        </Container>
      </AdminLayout>
    </>
  )
}

export default Dashboard
