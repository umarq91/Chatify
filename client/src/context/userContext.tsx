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
    const getUser = async () => {
      try {
        const response = await axios.get("/api/auth/profile");

        if (response.status === 200) {
          const userData = response.data;
          setUser(userData);
          setLoading(false);
        } else {
          // Handle specific error scenarios here based on your backend response format
          console.error("Error fetching user data:", response.data);
          setLoading(false); // Still set loading to false on error
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
