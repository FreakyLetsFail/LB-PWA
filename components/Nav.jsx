"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaUserLargeSlash } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} 
from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, [])
  

  return (
<nav className="flex justify-center items-center w-10/10 p-3 rounded-xl bg-black text-white fixed bottom-[-2%] left-0 right-0 -translate-y-1/2 z-10 ">
  {/*Desktop Version*/}
  <div className='sm:flex hidden w-50% mx-auto '>
      {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link href="calendar" className='base-btn'>
          <FaCalendarDays className="icon-size" />
          </Link>

          <Link href="verbindungen"
          className='base-btn'>
          <FaListUl className="icon-size"/>
        
          </Link>

          <Link href="maps"
          className='base-btn'>
          <FaMapLocationDot className="icon-size"/>
          </Link>

          <button type="button" className='base-btn' onClick={signOut}>
          <FaUserLargeSlash className="icon-size"/>
          </button>

          <Link href="/profile">
            <Image
            src={session?.user.image}
            alt="profile"
            width={37}
            height={37}
            className='rounded-full'/>

          </Link>

        </div>
      ): (
        <>
        {providers && 
          Object.values(providers).map((provider)=> (
            <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='base-btn'
            >
              <FaArrowRightFromBracket />
            </button>
          ))}
        </>
      )}
    </div>
  {/*Mobile Version*/}
  <div className='flex sm:hidden justify-center w-8/10 mx-auto'>
      {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link href="calendar" className='base-btn'>
          <FaCalendarDays className="icon-size" />
          </Link>

          <Link href="verbindungen" className='base-btn'>
          <FaListUl className="icon-size"/>
          </Link>

          <Link href="maps" className='base-btn'>
          <FaMapLocationDot className="icon-size"/>
          </Link>

          <button href="button" className='base-btn' onClick={signOut}>
          <FaUserLargeSlash className="icon-size"/>
          </button>

          <button href="/profile">
            <Image
            src={session?.user.image}
            alt="profile"
            width={37}
            height={37}
            className='rounded-full'/>
          </button>

        </div>
      ): (
        <>
        {providers && 
          Object.values(providers).map((provider)=> (
            <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='base-btn'
            >
              <FaArrowRightFromBracket />
            </button>
          ))}
        </>
      )}
    </div>
 </nav>

 
  )
}

export default Nav;