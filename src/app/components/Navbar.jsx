'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CiUser } from 'react-icons/ci';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '../lib/auth-client';
import { toast } from 'react-toastify';
import UseAvatar from './UseAvatar';
import { Button } from '@heroui/react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);


  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;


  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Account signed out successfully!');
            setTimeout(() => {
              router.push('/login');
            }, 1000);
          },
          onError: (error) => {
            toast.error('Failed to sign out');
            console.error('Sign out error:', error);
          },
        },
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Something went wrong');
    }
  };

  const linkClasses = (path) =>
    pathname === path
      ? 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
      : 'text-gray-700 hover:text-cyan-600';

  return (
    <nav className='bg-white shadow-md sticky top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-6'>
        {/* Left Links */}
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
          <li>
            <Link href='/my-bookings' className={linkClasses('/my-bookings')}>
              My Bookings
            </Link>
          </li>
        </ul>

        {/* Logo - Fixed Image warning */}
        <div>
          <Link href='/'>
            <div className='w-36 h-12 relative'>
              {' '}
              {/* w-36 = 144px, h-12 = 48px */}
              <Image
                src='/assets/Wanderlast.png'
                alt='Wanderlast Logo'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-contain cursor-pointer'
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className='hidden md:flex items-center gap-8 font-medium'>
          <Link href='/my-profile' className={linkClasses('/my-profile')}>
            <div className='flex items-center gap-1'>
              <CiUser size={20} />
              <span>Profile</span>
            </div>
          </Link>

          {!isPending && (
            <>
              {!user ? (
                <div className='flex items-center gap-4'>
                  <Link href='/login' className={linkClasses('/login')}>
                    Login
                  </Link>
                  <Link href='/signup' className={linkClasses('/signup')}>
                    Signup
                  </Link>
                </div>
              ) : (
                <div className='flex items-center gap-3'>
                  <p className='text-sm font-medium text-gray-700'>
                    Hello, {user.name?.split(' ')[0] || user.name}
                  </p>
                  <UseAvatar user={user} />
                  <Button
                    variant='danger'
                    onClick={handleSignOut}
                    className='text-white rounded-sm hover:bg-cyan-700 hover:text-white transition cursor-pointer'
                  >
                    Logout
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-2xl text-gray-700'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white shadow-md px-6 py-4 space-y-4 flex flex-col'>
          <Link
            href='/'
            onClick={() => setIsOpen(false)}
            className={linkClasses('/')}
          >
            Home
          </Link>
          <Link
            href='/destinations'
            onClick={() => setIsOpen(false)}
            className={linkClasses('/destinations')}
          >
            Destinations
          </Link>
          <Link
            href='/add-destination'
            onClick={() => setIsOpen(false)}
            className={linkClasses('/add-destination')}
          >
            Add Destination
          </Link>
          <Link
            href='/my-bookings'
            onClick={() => setIsOpen(false)}
            className={linkClasses('/my-bookings')}
          >
            My Bookings
          </Link>
          <Link
            href='/profile'
            onClick={() => setIsOpen(false)}
            className={linkClasses('/profile')}
          >
            Profile
          </Link>

          {!user ? (
            <>
              <Link
                href='/login'
                onClick={() => setIsOpen(false)}
                className={linkClasses('/login')}
              >
                Login
              </Link>
              <Link
                href='/signup'
                onClick={() => setIsOpen(false)}
                className={linkClasses('/signup')}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className='flex items-center gap-3 pt-2'>
                <UseAvatar user={user} />
                <span className='text-sm font-medium'>Hello, {user.name}</span>
              </div>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className='text-left text-red-700 hover:text-cyan-600 transition cursor-pointer'
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
