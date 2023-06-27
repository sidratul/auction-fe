
import React, { useState, createContext, ReactNode, useEffect, useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { AuthToken, LoginResponse } from '@/services/auth/type';
import { User } from '@/services/user';
import { setDefaultToken } from '@/services/api';

interface BaseLayoutContextProps {
  token?: AuthToken;
  userLogin: (loginResponse: LoginResponse) => void;
  logout: () => void;
}

const BaseLayoutContext = createContext<BaseLayoutContextProps>({} as BaseLayoutContextProps);

const COOKIE_NAME = 'userlogin';

export const BaseLayout = ({children}: {children: ReactNode}) => {
  const [token, setToken] = useState<AuthToken>();
  const [loading, setLoading] = useState<boolean>(true);

  const userLogin = (loginResponse: LoginResponse) => {
    setToken(loginResponse.access_token);
    setDefaultToken(loginResponse.access_token);
    setCookie(COOKIE_NAME, JSON.stringify(loginResponse));
  }

  const logout = () => {
    setToken(undefined);
  }

  useEffect(()=> {
    const cookieData = getCookie(COOKIE_NAME);
    if(cookieData) {
      const loginResponse: LoginResponse = JSON.parse(cookieData);
      setToken(loginResponse.access_token);
    }

    setLoading(false);
  },[])

  return (
    <BaseLayoutContext.Provider
      value={{
        token,
        userLogin,
        logout,
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

