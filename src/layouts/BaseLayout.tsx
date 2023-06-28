
import React, { useState, createContext, ReactNode, useEffect, useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { LoginResponse } from '@/services/auth/types';
import { User, getProfile } from '@/services/user';
import { setDefaultToken } from '@/services/api';

interface BaseLayoutContextProps {
  user?: User;
  userLogin: (loginResponse: LoginResponse) => void;
  logout: () => void;
}

const BaseLayoutContext = createContext<BaseLayoutContextProps>({} as BaseLayoutContextProps);

const COOKIE_NAME = 'userlogin';

export const BaseLayout = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const { data: userData, error } = getProfile( !!user );

  const userLogin = (loginResponse: LoginResponse) => {
    setUser(loginResponse.user);
    setDefaultToken(loginResponse.access_token);
    setCookie(COOKIE_NAME, JSON.stringify(loginResponse));
  }

  const logout = () => {
    setUser(undefined);
    removeCookie(COOKIE_NAME);
  }

  if (error && error.response?.status === 401) {
    logout();
  }

  useEffect(()=> {
    const cookieData = getCookie(COOKIE_NAME);
    if(cookieData) {
      const loginResponse: LoginResponse = JSON.parse(cookieData);
      setDefaultToken(loginResponse.access_token);
      setUser(loginResponse.user);
    }

    setLoading(false);
  },[]);

  return (
    <BaseLayoutContext.Provider
      value={{
        userLogin,
        logout,
        user: userData? userData : user,
      }}
    >
      {loading ? (
        // TODO: create splash screeen
        <div>Loading...</div>
      ): children}
      <ToastContainer/>
    </BaseLayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(BaseLayoutContext);

