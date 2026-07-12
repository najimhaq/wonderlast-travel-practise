// src/app/my-bookings/page.jsx
import { headers } from 'next/headers';
import Image from 'next/image';
import { auth } from '../lib/auth';
import BookingActions from '../components/BookingActions';

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  let bookings = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/booking?userId=${user?.id}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.status}`);
    }

    const data = await res.json();
    bookings = data?.data || [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }

  return (
    <div className='mx-auto max-w-5xl px-4 py-10 md:px-6'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 md:text-4xl'>
          My Bookings
        </h1>
        <p className='mt-1 text-gray-500'>
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-20 text-center'>
          <div className='mb-4 text-5xl'>🗺️</div>
          <h2 className='text-xl font-semibold text-gray-700'>
            No bookings yet
          </h2>
          <p className='mt-2 text-gray-400'>
            You haven&apos;t booked any trips yet.
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className='flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center'
            >
              {/* Image */}
              <div className='relative h-36 w-full overflow-hidden rounded-xl sm:h-32 sm:w-48 flex-shrink-0'>
                <Image
                  src={booking.imageUrl}
                  alt={booking.destinationName}
                  fill
                  sizes='(max-width: 640px) 100vw, 192px'
                  className='object-cover'
                />
              </div>

              {/* Info + Actions */}
              <div className='flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                <div>
                  <h2 className='text-xl font-bold text-gray-800'>
                    {booking.destinationName}
                  </h2>

                  <div className='mt-1.5 space-y-1 text-sm text-gray-500'>
                    <p className='flex items-center gap-2'>
                      📅 Departure:{' '}
                      {new Date(booking.departureDate).toLocaleDateString(
                        'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </p>
                    <p className='flex items-center gap-2'>
                      📍 Booking ID:{' '}
                      <span className='font-mono text-xs'>{booking._id}</span>
                    </p>
                  </div>

                  <p className='mt-3 text-2xl font-bold text-cyan-500'>
                    ${booking.price}
                  </p>
                </div>

                {/* Action Buttons */}
                <BookingActions bookingId={booking._id.toString()} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
