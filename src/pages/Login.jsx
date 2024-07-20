import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { bgGradiyent } from '../components/constants/color';
import { server } from '../components/constants/config';
import { VisuallyHiddenInput } from '../components/styles/StyledComponent';
import { userExits } from '../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../api/apiServices';
import { apiList } from '../api/apiList';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleLoginToggel = () => {
    setIsLogin(!isLogin);
  };
  // dispatch
  const dispatch = useDispatch();

  //Handle File
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Login
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const hadleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // Register
  const [register, setRegister] = useState({
    name: '',
    username: '',
    bio: '',
    password: '',
    photo: '',
  });

  const hadleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await postRequest(apiList.loginAPI, login);
    dispatch(userExits({ user: data.user, token: data.token })); // Store user and token
    toast.success(data.message);
    navigate('/');
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const fromData = new FormData();
      fromData.append('name', register.name);
      fromData.append('username', register.username);
      fromData.append('bio', register.bio);
      fromData.append('password', register.password);
      fromData.append('avatar', selectedFile);
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        `${server}api/v1/user/new`,
        fromData,
        config
      );
      dispatch(userExits(data.user));
      dispatch(userExits({ user: data.user, token: data.token })); // Store user and token
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Wen wrong');
    }
  };

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
          {isLogin ? (
            <>
              <Typography>Login</Typography>
              <form
                style={{ width: '100%', marginTop: '1rem' }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  name="username"
                  value={login.username}
                  onChange={hadleChangeLogin}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={login.password}
                  name="password"
                  onChange={hadleChangeLogin}
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
                <Typography textAlign={'center'} m={'1rem'}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={handleLoginToggel}
                >
                  Don't have Account? Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography>Register</Typography>
              <form
                style={{ width: '100%', marginTop: '1rem' }}
                onSubmit={handleRegister}
              >
                <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                  <Avatar
                    sx={{
                      width: '10rem',
                      height: '10rem',
                      objectFit: 'contain',
                    }}
                    src={imagePreview}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      ':hover': {
                        bgcolor: 'rgba(0,0,0,0.7)',
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                      />
                    </>
                  </IconButton>
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  name="name"
                  value={register.name}
                  onChange={hadleChangeRegister}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  name="bio"
                  value={register.bio}
                  onChange={hadleChangeRegister}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  name="username"
                  value={register.username}
                  onChange={hadleChangeRegister}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={register.password}
                  name="password"
                  onChange={hadleChangeRegister}
                />
                <Button
                  sx={{ marginTop: '1rem' }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Register
                </Button>
                <Typography textAlign={'center'} m={'1rem'}>
                  OR
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={handleLoginToggel}
                >
                  Already Account? Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
