import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { bgGradiyent } from '../../components/constants/color';
import { Navigate } from 'react-router-dom';

const isAdmin = false

const AdminLogin = () => {
  // state define
  const [seceretKey, setSeceretKey] = useState('');
  // login handler
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Hi i am Submit');
  };

  // chek admin
  if(isAdmin) return <Navigate to={"/admin/dashboard"} />
  
  return (
    <div style={{ backgroundImage: bgGradiyent }}>
      <Container
        component={'main'}
        maxWidth="xs"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography>Admin Login</Typography>
          <form
            style={{ width: '100%', marginTop: '1rem' }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Seceret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={seceretKey}
              name="seceretKey"
              onChange={(e) => setSeceretKey(e.target.value)}
            />
            <Button
              sx={{ marginTop: '1rem' }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
