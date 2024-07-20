import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProttectRoutes from './components/auth/ProttectRoutes';
import { LayoutLoaders } from './components/layout/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { userExits, userNotExits } from './redux/slices/auth';
import { Toaster } from 'react-hot-toast';
import { getRequest } from './api/apiServices';
import { apiList } from './api/apiList';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));

const App = () => {
  const { user, loader, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fetchData = async () => {
    const data = await getRequest(apiList.me);
    if (data) {
      dispatch(userExits({ user: data?.data.user, token: token }));
    } else {
      dispatch(userNotExits());
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          <Route element={<ProttectRoutes user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProttectRoutes user={!user} redirect="/">
                <Login />
              </ProttectRoutes>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/user-managment" element={<UserManagement />} />
          <Route path="/admin/group-management" element={<ChatManagement />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
  ƒ;
};

export default App;
