import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useLayoutContext } from './BaseLayout';

export const GuestLayout = ({children}: {children: ReactNode}) => {
  const { user } = useLayoutContext();
  const { push } = useRouter();

  useEffect(()=>{
    if(!user) {
      return;
    }

    push('/');
  },[user, push]);

  return (
    <>{children}</>
  )
}
