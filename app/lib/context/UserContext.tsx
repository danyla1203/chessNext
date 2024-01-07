'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "@/app/lib/request";
import { useRouter } from "next/navigation";

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

export const useUserState = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('No context provided');
  }
  return context;
}

export const UserProvider = ({ children }: {
  children: React.ReactNode;
}) => {

  const [ profile, setProfile ] = useState<Profile | null>(null);
  const [ isLoaded, setStatus ] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // TODO: Potential XSS vulnerability, change it in future
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getProfile(accessToken)
      .then((profile) => {
        if (!profile.error) {
          setProfile(profile);
        }
        setStatus(true)
      })
      .catch(() => setStatus(true));
    } else setStatus(true);
  }, []);
  const stateUser: UserState = {
    profile,
    updateUser: (profile: Profile) => {
      setProfile(profile);
    }
  }

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <UserContext.Provider value={stateUser}>
      {children}
    </UserContext.Provider>
  );
}
