import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        try {
          const response = await axios.get("/api/auth/profile");
           
          if (response.status === 200) {
            const userData = response.data;

            setUser(userData);
            setLoading(false);
          }
        } catch (error) {
          // Handle errors here
          console.log("Backend Not connected properly");
        }
      }
      getUser();
    }

  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
