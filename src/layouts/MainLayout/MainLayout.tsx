import React, { ReactNode, useEffect } from 'react'
import { useLayoutContext } from '../BaseLayout';
import { useRouter } from 'next/router';
import { Navigation } from '@/components/Navigation';
import { Header } from './Header';

export const MainLayout = ({children}: {children: ReactNode}) => {
  const { user } = useLayoutContext();
  const { push, back } = useRouter();

  useEffect(()=>{
    if(user){
      return;
    }

    push('/login');
  },[user, push]);

  return (
    <main className="bg-gray-300 min-h-screen">
      <div className="flex">
        <div className="w-[356px] hidden lg:block">
          <Navigation/>
        </div>
        <div className="flex-1">
          <div className="flex flex-col h-screen">
            <div className='bg-gray-300 pb-2 lg:pb-4'>
              <div className="grid grid-cols-2 w-full gap-4 py-4 px-3 md:p-4 bg-white">
                <Header/>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-2 pt-0 lg:p-4 lg:pt-0">
              <div className='rounded-lg bg-white p-3 min-h-full'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


