import React, { useEffect } from 'react'
import { useLayoutContext } from '@/layouts';
import { useRouter } from 'next/router';

export default function Logout(){
  const { logout, token } = useLayoutContext();
  const { push } = useRouter();

  useEffect(() => {
    logout()
  }, [logout]);

  useEffect(() => {
    if(!token){
      push('/login');
    }
  }, [token, push]);

  return (
    <></>
  )
}
