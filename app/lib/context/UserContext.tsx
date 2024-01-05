'use client'

import { createContext, useEffect, useState } from "react";
import { getProfile } from "@/app/lib/request";

type Profile = {
  id: number;
  name: string;
  isAuthorized: boolean
}

export type UserState = {
  profile: Profile | null,
  updateUser: (data: any) => void;
}

export const UserContext = createContext<UserState>({
  profile: null,
  updateUser: () => {
    throw new Error('User context is not set');
  }
});

export const UserProvider = ({ children }: {
  children: React.ReactNode;
}) => {

  const [ profile, setProfile ] = useState<Profile | null>(null);

  useEffect(() => {
    // TODO: Potential XSS vulnerability, change it in future
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getProfile(accessToken).then((profile) => setProfile(profile))
    }
  }, []);

  const stateUser: UserState = {
    profile,
    updateUser: (profile: Profile) => {
      setProfile(profile);
    }
  }

  return (
    <UserContext.Provider value={stateUser}>
      {children}
    </UserContext.Provider>
  );
}
