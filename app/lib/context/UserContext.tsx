'use client'

import { createContext, useEffect, useState } from "react";
import { getProfile } from "../request/userProfile";

type User = {
  id: number;
  name: string;
  isAuthorized: boolean
}

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    // TODO: Potential XSS vulnerability, change it in future
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getProfile(accessToken).then((user) => setUser(user))
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
