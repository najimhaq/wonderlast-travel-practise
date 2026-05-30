'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { BookingDeleteAlert } from './BookingDeleteAlert';

const BookingActions = ({ bookingId }) => {
  const router = useRouter();

  const handleCancel = async () => {
    // if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const res = await fetch(`http://localhost:5050/booking/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Booking cancelled successfully');
        router.refresh();
      } else {
        toast.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  const handleView = () => {
    router.push(`/my-bookings/${bookingId}`);
  };

  return (
    <div className='flex items-center gap-3 sm:flex-col sm:items-end'>
      <BookingDeleteAlert handleCancel={handleCancel} />
      <button
        onClick={handleView}
        className='cursor-pointer flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600'
      >
        👁 View
      </button>
    </div>
  );
};

export default BookingActions;
