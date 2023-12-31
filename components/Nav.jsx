"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders} 
from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, [])
  

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Lets Bummel</p>
      </Link>

    {/*Desktop Navigation*/}
    <div className='sm:flex hidden'>
      {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link href="calendar"
          className='black_btn'>
          Kalendar
          </Link>

          <Link href="verbindungen"
          className='black_btn'>
          Verbindungen
          </Link>

          <Link href="maps"
          className='black_btn'>
          Karte
          </Link>

          <button type="button" onClick={signOut} className='outline_btn'>
            Ausloggen
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
            className='black_btn'
            >
              Log In
            </button>
          ))}
        </>
      )}
    </div>


    {/*Mobile Navigation*/}
    <div className='sm:hidden flex relative'>
      {session?.user ? (
        <div className='flex'>
          <Image
          src={session?.user.image}
          alt="profile"
          width={37}
          height={37}
          className='rounded-full'
          onClick={() => setToggleDropdown((prev) => !prev)}
          />

        {toggleDropdown && (
          <div className='dropdown'>
            <Link
            href="/profile"
            className='dropdown_link'
            onClick={() => setToggleDropdown (false)}
            >
              My Profile
            </Link>
            <Link
            href="/calendar"
            className='dropdown_link'
            onClick={() => setToggleDropdown (false)}
            >
                Kalendar
            </Link>

            <Link
            href="/verbindungen"
            className='dropdown_link'
            onClick={() => setToggleDropdown (false)}
            >
                Verbindungen
            </Link>

            <Link
            href="/maps"
            className='dropdown_link'
            onClick={() => setToggleDropdown (false)}
            >
                Karte
            </Link>

            <button
            type='button'
            onClick={() => {
              setToggleDropdown(false);
              signOut();
            }}
            >
              Ausloggen
            </button>
             
          </div>
        )}
        </div>
      ): (
        <>
        {providers && 
          Object.values(providers).map((provider) => (
            <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
            >
              Log In
            </button>
          ))}
        </>
      )}
    </div>

 </nav>
  )
}

export default Nav