import React, { useState } from 'react'
import { Navigation } from './Navigation';
import { GiHamburgerMenu } from "react-icons/gi";
import { Hamburger } from '../Hamburger';

export const MobileNavigation = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      {/* <GiHamburgerMenu
        onClick={()=>setActive(true)}
      /> */}
      <Hamburger active={active} onClick={()=>setActive(true)}/>
      <div
        className={`transition-all duration-300 absolute top-0 max-w-full ${active? "left-0 w-full" : "w-[356px] left-[-356px]"}`}
        onClick={()=>setActive(false)}
      >
        <div className="w-[356px] max-w-[85%]">
          <Navigation key="navigation"/>
        </div>
      </div>
    </>
  )
}

