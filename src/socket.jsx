import io from 'socket.io-client';
import { getToken } from './utils/helper';
import { createContext, useContext, useMemo } from 'react';
import { server } from './components/constants/config';

// define context
const SocketContext = createContext();

// access context
const getSocket = () => useContext(SocketContext);

// write provider
const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
