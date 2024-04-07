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
  const {user}:any = useContext(UserContext)
  const [onlineUsers, setOnlineUsers] = useState([]);


  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:5000', {
        query: { userId: user._id }, // Use user._id directly as user is available
      });
      setSocket(newSocket);

      newSocket.on("onlineusers", (users) => {
        setOnlineUsers(users);
      });
  
    }

 
   
    return () => {
      // Disconnect socket when effect unmounts
      socket && socket.disconnect();
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket , onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;