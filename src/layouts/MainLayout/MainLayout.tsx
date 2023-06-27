import React, { ReactNode, useEffect } from 'react'
import { useLayoutContext } from '../BaseLayout';
import { useRouter } from 'next/router';


export const MainLayout = ({children}: {children: ReactNode}) => {
  const { token } = useLayoutContext();
  const { push } = useRouter();

  useEffect(()=>{
    if(token){
      return;
    }

    push('/login');
  },[token, push]);

  return (
    <main
      className={`min-h-screen bg-gray-100`}
    >
      <div className="container mx-auto px-3 lg:px-6 py-3 lg:py-8">
        {children}
      </div>
    </main>
  )
}
