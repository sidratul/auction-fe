import React from 'react'
import { LoginTabOptions } from '../Login'

interface LoginTabProps {
  activeTab: LoginTabOptions;
  onClick: (tab: LoginTabOptions) => void;
}

const styles = {
  active: 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500',
  inActive: 'border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
}

export const LoginTab = (props: LoginTabProps) => {
  const { activeTab, onClick } = props;
  return (
    <ul className="flex flex-wrap">
      {
        ['login', 'register'].map( tab => (
          <li key={`tab-${tab}`} className="mr-2" onClick={()=>onClick(tab as LoginTabOptions)}>
            <a href="#" className={`capitalize inline-block p-4 ${tab === activeTab ? styles.active : styles.inActive }`}>{tab}</a>
          </li>
        ))
      }
    </ul>
  )
}
