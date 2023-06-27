import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useLayoutContext } from './BaseLayout';

export const GuestLayout = ({children}: {children: ReactNode}) => {
  const { token } = useLayoutContext();
  const { push } = useRouter();

  useEffect(()=>{
    if(!token) {
      return;
    }

    push('/');
  },[token, push]);

  return (
    <>{children}</>
  )
}
