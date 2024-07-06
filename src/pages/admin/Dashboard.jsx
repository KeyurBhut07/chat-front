import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from '@mui/icons-material';
import moment from 'moment';
import {
  CurveButton,
  SearchField,
} from '../../components/styles/StyledComponent';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';

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
  );

  // Widgets
  const Widgets = (
    <>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={'2rem'}
        justifyContent={'space-between'}
        alignItems={'center'}
        margin={'2rem 0'}
      >
        <Widget title={'User'} value={'34'} Icon={<Person />} />
        <Widget title={'Chats'} value={'3'} Icon={<Group />} />
        <Widget title={'Messages'} value={'434'} Icon={<Message />} />
      </Stack>
    </>
  );
  return (
    <>
      <AdminLayout>
        <Container component={'main'}>
          {Appbar}

          {/* chart area */}
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            sx={{gap : "2rem"}}
            flexWrap={'wrap'}
            justifyContent={{
               xs : "center",
              lg : "stretch"
            }}
            alignItems={{
              xs : "center",
              lg : "stretch"
            }}

          >
            <Paper
              elevation={3}
              sx={{
                padding: '2rem 3.5rem',
                borderRadius: '1rem',
                width: '100%',
                maxWidth: '45rem',
              }}
            >
              <Typography variant="h4" margin={'2rem 0'}>
                Last Messages
              </Typography>
              <Stack>
                <LineChart value={[1, 4, 7, 9, 3, 16, 8]} />
              </Stack>
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
              }}
            >
              <DoughnutChart
                labale={['Single Chats', 'Group Chats']}
                value={[30, 70]}
              />

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
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={5}
    sx={{
      padding: '2rem',
      margin: '2rem 0',
      borderRadius: '1.5rem',
      width: '20rem',
    }}
  >
    <Stack alignItems={'center'} spacing={'1rem'}>
      <Typography
        sx={{
          color: 'rgba(0,0,0,0.7)',
          borderRadius: '50%',
          border: '6px solid rgba(0,0,0,0.9)',
          height: '5rem',
          width: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
