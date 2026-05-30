import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { RiMapPin5Line } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';

async function getBooking(id) {
  try {
    const res = await fetch(`http://localhost:5050/booking/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch {
    return null;
  }
}

export default async function BookingDetailsPage({ params }) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) notFound();

  return (
    <div className='mx-auto max-w-3xl px-4 py-10 md:px-6'>
      <div className='mb-8 border-b border-gray-200 pb-6'>
        <Link
          href='/my-bookings'
          className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-cyan-600'
        >
          <FaArrowLeft />
          <span>Back To My Bookings</span>
        </Link>
      </div>

      {/* Hero Image */}
      <div className='relative mb-8 h-[250px] overflow-hidden rounded-2xl md:h-[360px]'>
        <Image
          src={booking.imageUrl}
          alt={booking.destinationName}
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
      </div>

      {/* Booking Info Card */}
      <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm'>
        {/* Success Badge */}
        <div className='mb-6 flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl'>
            ✓
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>
              Booking Confirmed!
            </h1>
            <p className='font-mono text-xs text-gray-400'>ID: {id}</p>
          </div>
        </div>

        {/* Details */}
        <div className='space-y-4 border-t border-gray-100 pt-6'>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Destination</span>
            <span className='font-semibold text-gray-800'>
              {booking.destinationName}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-gray-500'>Country</span>
            <span className='flex items-center gap-1 font-semibold text-gray-800'>
              <RiMapPin5Line className='text-cyan-500' />
              {booking.country}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-gray-500'>Price</span>
            <span className='text-xl font-bold text-cyan-500'>
              ${booking.price}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-gray-500'>Departure Date</span>
            <span className='font-semibold text-gray-800'>
              {new Date(booking.departureDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-gray-500'>Passenger</span>
            <span className='font-semibold text-gray-800'>
              {booking.userName}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-gray-500'>Email</span>
            <span className='font-semibold text-gray-800'>
              {booking.userEmail}
            </span>
          </div>
        </div>

        <div className='mt-8'>
          <Link
            href='/destinations'
            className='block w-full rounded-xl bg-cyan-500 py-3 text-center font-semibold text-white transition hover:bg-cyan-600'
          >
            Explore More Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
