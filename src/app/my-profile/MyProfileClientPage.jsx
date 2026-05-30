import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '../lib/auth';
import { FaEnvelope, FaIdBadge, FaMapMarkerAlt, FaCalendarAlt, FaPlane } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const MyProfileClientPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center px-4'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>🔒</div>
          <h1 className='text-2xl font-bold text-gray-800'>Access Denied</h1>
          <p className='mt-2 text-gray-500'>
            Please login to view your profile.
          </p>
          <Link
            href='/login'
            className='mt-6 inline-block rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-600 transition'
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const initials =
    user.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Cover Banner */}
      <div className='relative h-48 w-full overflow-hidden bg-linear-to-r from-cyan-500 via-cyan-400 to-teal-400 md:h-64'>
        <div
          className='absolute inset-0 '
          style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2020/03/24/20/53/norway-4965490_1280.jpg")`,
          }}
        />
      </div>

      <div className='mx-auto max-w-5xl px-4 md:px-6'>
        {/* Profile Avatar — overlapping banner */}
        <div className='-mt-16 mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='flex items-end gap-4'>
            <div className='relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-lg'>
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  fill
                  sizes='128px'
                  className='object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-cyan-400 to-teal-500 text-4xl font-bold text-white'>
                  {initials}
                </div>
              )}
            </div>

            <div className='mb-2'>
              <div className='flex items-center gap-2'>
                <h1 className='text-2xl font-bold text-gray-800'>
                  {user.name || 'Unknown User'}
                </h1>
                <MdVerified className='text-cyan-500' size={22} />
              </div>
              <p className='text-sm text-gray-500'>{user.email}</p>
            </div>
          </div>

          <button className='mb-2 rounded-xl border border-cyan-500 px-5 py-2.5 text-sm font-medium text-cyan-500 transition hover:bg-cyan-50'>
            ✏️ Edit Profile
          </button>
        </div>

        {/* Stats Row */}
        <div className='mb-6 grid grid-cols-3 gap-4'>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm'>
            <p className='text-3xl font-bold text-cyan-500'>0</p>
            <p className='mt-1 text-sm text-gray-500'>Total Trips</p>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm'>
            <p className='text-3xl font-bold text-cyan-500'>0</p>
            <p className='mt-1 text-sm text-gray-500'>Countries</p>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm'>
            <p className='text-3xl font-bold text-cyan-500'>0</p>
            <p className='mt-1 text-sm text-gray-500'>Bookings</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className='grid grid-cols-1 gap-6 pb-16 lg:grid-cols-[1fr_320px]'>
          {/* Left — Personal Info */}
          <div className='space-y-6'>
            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <h2 className='mb-5 text-lg font-semibold text-gray-800'>
                Personal Information
              </h2>

              <div className='space-y-4'>
                <div className='flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500'>
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400'>Email Address</p>
                    <p className='font-medium text-gray-800'>{user.email}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500'>
                    <FaIdBadge />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400'>User ID</p>
                    <p className='font-mono text-sm text-gray-800 break-all'>
                      {user.id}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500'>
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400'>Member Since</p>
                    <p className='font-medium text-gray-800'>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Not available'}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500'>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className='text-xs text-gray-400'>Location</p>
                    <p className='font-medium text-gray-800'>Not set</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Quick Links */}
          <div className='space-y-6'>
            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <h2 className='mb-5 text-lg font-semibold text-gray-800'>
                Quick Links
              </h2>
              <div className='space-y-3'>
                <Link
                  href='/my-bookings'
                  className='flex items-center gap-3 rounded-xl border border-gray-100 p-3 text-sm font-medium text-gray-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600'
                >
                  <FaPlane className='text-cyan-500' />
                  My Bookings
                </Link>
                <Link
                  href='/destinations'
                  className='flex items-center gap-3 rounded-xl border border-gray-100 p-3 text-sm font-medium text-gray-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600'
                >
                  <FaMapMarkerAlt className='text-cyan-500' />
                  Explore Destinations
                </Link>
              </div>
            </div>

            {/* Account Status */}
            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <h2 className='mb-5 text-lg font-semibold text-gray-800'>
                Account Status
              </h2>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>Email Verified</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.emailVerified
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {user.emailVerified ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>Account Type</span>
                  <span className='rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-600'>
                    Traveler
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MyProfileClientPage;
