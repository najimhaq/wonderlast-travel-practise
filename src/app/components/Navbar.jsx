'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CiUser } from 'react-icons/ci';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (path) =>
    pathname === path
      ? 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
      : 'text-gray-700 hover:text-cyan-600';

  return (
    <nav className='bg-white shadow-md fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-6'>
        {/* Left Links (hidden on mobile) */}
        <ul className='hidden md:flex gap-6 font-medium'>
          <li>
            <Link href='/' className={linkClasses('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link href='/destinations' className={linkClasses('/destinations')}>
              Destinations
            </Link>
          </li>
          <li>
            <Link
              href='/add-destination'
              className={linkClasses('/add-destination')}
            >
              Add Destination
            </Link>
          </li>
        </ul>

        {/* Center Logo */}
        <div>
          <Link href={'/'}>
            <Image
              src='/assets/Wanderlast.png'
              alt='Travel Agency Logo'
              width={150}
              height={150}
              className='cursor-pointer'
            />
          </Link>
        </div>

        {/* Right Links (hidden on mobile) */}
        <ul className='hidden md:flex items-center gap-6 font-medium'>
          <li>
            <Link href='/profile' className={linkClasses('/profile')}>
              <div className='flex items-center gap-1'>
                <CiUser size={20} />
                <span>Profile</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href='/login' className={linkClasses('/login')}>
              Login
            </Link>
          </li>
          <li>
            <Link href='/signup' className={linkClasses('/signup')}>
              Signup
            </Link>
          </li>
        </ul>

        {/* Hamburger Button (mobile only) */}
        <button
          className='md:hidden text-2xl text-gray-700'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white shadow-md px-6 py-4 space-y-4'>
          <Link href='/' className={linkClasses('/')}>
            Home
          </Link>
          <Link href='/destinations' className={linkClasses('/destinations')}>
            Destinations
          </Link>
          <Link href='/my-bookings' className={linkClasses('/my-bookings')}>
            My Bookings
          </Link>
          <Link href='/profile' className={linkClasses('/profile')}>
            Profile
          </Link>
          <Link href='/login' className={linkClasses('/login')}>
            Login
          </Link>
          <Link href='/signup' className={linkClasses('/signup')}>
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
