import React, { ReactNode, useEffect } from 'react'
import { useLayoutContext } from '../BaseLayout';
import { useRouter } from 'next/router';
import { MobileNavigation, Navigation } from '@/components/Navigation';
import { BiChevronLeftCircle } from "react-icons/bi";

export const MainLayout = ({children}: {children: ReactNode}) => {
  const { token } = useLayoutContext();
  const { push, back } = useRouter();

  useEffect(()=>{
    if(token){
      return;
    }

    push('/login');
  },[token, push]);

  return (
    <main className="bg-gray-300 min-h-screen">
      <div className="flex">
        <div className="w-[356px] hidden lg:block">
          <Navigation key="navigation"/>
        </div>
        <div className="flex-1">
          <div className="flex flex-col h-screen">
            <div className='bg-gray-300 pb-2 lg:pb-4'>
              <div className="flex flex-col items-start gap-4 py-4 px-3 md:p-6 bg-white">
                <div className="grid grid-cols-2 w-full ">
                  <button className="text-yellow-800 flex gap-1 text-sm items-center font-medium">
                    <BiChevronLeftCircle/><span>Back</span>
                  </button>
                  <div className="justify-self-end flex gap-4  items-center">
                    <div className='font-medium'>Balance: $100</div>
                    <div className='lg:hidden'>
                      <MobileNavigation/>
                    </div>
                  </div>
                </div>
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


