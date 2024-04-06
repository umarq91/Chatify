// SocketContext.ts
import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from './userContext';
interface SocketContextProps {
children: React.ReactNode;
}

const SocketContext = createContext({});

export const SocketProvider = ({ children }: SocketContextProps) => {
  const [socket, setSocket] = useState(null);
  const {user} = useContext(UserContext)

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
  
    newSocket.on('connect', () => {
      console.log('Connected to socket.io server from context');
    });
  
    return () => {
      // Clean up socket connection on unmount
      newSocket.disconnect();
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
