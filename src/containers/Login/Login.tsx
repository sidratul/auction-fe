import React, { useState } from 'react';
import { LoginTab } from './Tab/Tab';
import { LoginForm } from './LoginForm/LoginForm';
import { RegisterForm } from './RegiterForm/RegisterForm';

export type LoginTabOptions = 'login' | 'register';

export const Login = () => {
  const [tab, setTab] = useState<LoginTabOptions>('login');
  const Form = tab === 'login' ? LoginForm : RegisterForm;

  return (
    <main className={`min-h-screen bg-gray-100 pt-28`}>
      <div className='grid items-start bg-white w-11/12 md:w-7/12 lg:w-6/12 max-w-lg mx-auto px-12 py-4 min-h-[480px]'>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 -mx-12 px-12 ">
          <LoginTab
            activeTab={tab}
            onClick={(newTab)=> setTab(newTab)}
          />
        </div>
        <div className='py-5'>
          <Form/>
        </div>
      </div>
    </main>
  )
}
