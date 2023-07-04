import React from 'react';
import { Button } from '../Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

/** TODO: create as props */
const menus = [
  {
    label: 'Deposit',
    href: '/deposit'
  },
  {
    label: 'Items',
    href: '/items'
  },
];

export const Navigation = () => {
  const { push } = useRouter();
  return (
    <div className="grid h-screen bg-cyan-900 text-white px-[24px] py-[40px] overflow-auto content-between">
      <div className="grid gap-6">
        {menus.map(menu => (
          <Link key={`nav-${menu.label}`} href={menu.href} className="flex gap-2">{menu.label}</Link>
        ))}
      </div>
      <div>
        <div className="grid gap-6">
          <Button
            onClick={()=>push(`/logout`)}
          ><span className="text-black font-medium">Logout</span></Button>
        </div>
      </div>
    </div>
  );
}