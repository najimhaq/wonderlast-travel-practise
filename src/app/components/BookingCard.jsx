'use client';

import { useState } from 'react';
import { Button, Card } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import { authClient } from '../lib/auth-client';
import { toast } from 'react-toastify';

const BookingCard = ({ destination }) => {
  const router = useRouter();

  const { _id, imageUrl, destinationName, price, country, departureDate } =
    destination;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      // Token
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      console.log('token:', token);

      if (!token) {
        toast.error('Session expired, please login again');
        router.push('/login');
        return;
      }

      // Booking data prepare
      const bookingData = {
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        destinationId: _id,
        destinationName,
        country,
        imageUrl,
        price,
        departureDate: selectedDate
          ? new Date(selectedDate).toISOString()
          : new Date(departureDate).toISOString(),
      };

      // API call
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Booking successful!');
        router.push('/my-bookings');
      } else {
        toast.error(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div>
        <p className='mb-1 text-sm text-gray-400'>Starting from</p>
        <h3 className='text-4xl font-bold text-cyan-500'>${price}</h3>
        <p className='mt-1 mb-5 text-sm text-gray-500'>per person</p>

        {/* Date Input */}
        <div className='mb-5'>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            Travel Date
          </label>
          <input
            type='date'
            className='h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <Button
          className='h-12 w-full rounded-xl bg-cyan-500 text-white hover:bg-cyan-600'
          onPress={handleBooking}
          isDisabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Book Now'}
        </Button>

        <div className='mt-6 space-y-3 text-sm text-gray-500'>
          <div className='flex items-start gap-3'>
            <FaCheck className='mt-1 text-green-500' />
            <span>Free cancellation up to 7 days</span>
          </div>
          <div className='flex items-start gap-3'>
            <FaCheck className='mt-1 text-green-500' />
            <span>Travel insurance included</span>
          </div>
          <div className='flex items-start gap-3'>
            <FaCheck className='mt-1 text-green-500' />
            <span>24/7 customer support</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
