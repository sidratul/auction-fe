import React from 'react';
import { Button } from '../Button';
import Link from 'next/link';


const menus = [...Array(5)].map((_, i) => {
  return {
    label: `Menu ${i+1}`,
    href: '/',
  }
});

export const Navigation = () => {
  return (
    <div className="grid h-screen bg-cyan-900 text-white px-[24px] py-[40px] overflow-auto content-between">
      <div className="grid gap-6">
        {menus.map(menu => (
          <Link key={menu.href} href={menu.href} className="flex gap-2">{menu.label}</Link>
        ))}
      </div>
      <div>
        <div className="grid gap-6">
          <Button><span className="text-black font-medium">Logout</span></Button>
        </div>
      </div>
    </div>
  );
}