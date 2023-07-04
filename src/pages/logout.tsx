import React, { useEffect } from 'react'
import { useLayoutContext } from '@/layouts';
import { useRouter } from 'next/router';

export default function Logout(){
  const { logout, user } = useLayoutContext();
  const { push } = useRouter();

  useEffect(() => {
    logout()
  }, [logout]);

  useEffect(() => {
    if(!user){
      push('/login');
    }
  }, [user, push]);

  return (
    <></>
  )
}
