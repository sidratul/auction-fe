import React, { useEffect } from 'react';
import { MobileNavigation } from '@/components/Navigation';
import { BiChevronLeftCircle } from "react-icons/bi";
import { getBalance } from '@/services/balance';
import { useMainLayoutContext } from './MainLayout';
import { useRouter } from 'next/router';

export const Header = () => {
  const { data, isLoading , error } = getBalance();
  const { back } = useRouter();


  return (
    <>
      <button
        className="text-yellow-800 flex gap-1 text-sm items-center font-medium"
        onClick={()=> back()}
      >
        <BiChevronLeftCircle/><span>Back</span>
      </button>
      <div className="justify-self-end flex gap-4  items-center">
        { data && !isLoading && !error && (
          <div className='font-medium'>Balance: ${data.amount}</div>
        )}
        <div className='lg:hidden'>
          <MobileNavigation/>
        </div>
      </div>
    </>
  )
}
