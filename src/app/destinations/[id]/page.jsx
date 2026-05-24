import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa';
import { EditModal } from '../../components/EditModal';
import { DeleteDestination } from '../../components/DeleteDestination';

async function getDestination(id) {
  try {
    const res = await fetch(`http://localhost:5050/destination/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data || data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function DestinationPageDetails({ params }) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    notFound();
  }

  const {
    imageUrl,
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    description,
  } = destination;

  return (
    <div className='mx-auto max-w-6xl px-4 py-10 md:px-6'>
      {/* Destination Details Header */}
      <div className='mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between'>
        <Link
          href='/destinations'
          className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-cyan-600'
        >
          <FaArrowLeft className='text-sm' />
          <span>Back To Destinations</span>
        </Link>
        {/* Edit Modal and Delete Buttons */}
        <div className='flex items-center gap-3'>
          <EditModal destination={destination} />
          <DeleteDestination destination={destination} />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
        <div className='relative h-75 overflow-hidden rounded-2xl md:h-112.5'>
          <Image
            src={imageUrl}
            alt={destinationName}
            fill
            sizes='(max-width: 768px) 100vw, 50vw'
            className='object-cover'
            priority
          />
        </div>

        <div className='flex flex-col justify-center'>
          <span className='mb-4 inline-block w-fit rounded-full bg-cyan-50 px-4 py-1 text-sm font-medium text-cyan-600'>
            {category}
          </span>

          <h1 className='text-3xl font-bold text-gray-800 md:text-4xl'>
            {destinationName}
          </h1>

          <p className='mt-2 text-lg text-gray-500'>{country}</p>

          <div className='mt-6 space-y-3 text-gray-700'>
            <p>
              <span className='font-semibold'>Price:</span> ${price}
            </p>
            <p>
              <span className='font-semibold'>Duration:</span> {duration}
            </p>
            <p>
              <span className='font-semibold'>Departure Date:</span>{' '}
              {new Date(departureDate).toLocaleDateString()}
            </p>
          </div>

          <p className='mt-6 leading-7 text-gray-600'>{description}</p>

          <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
            <Link
              href={`/booking/${id}`}
              className='inline-flex h-12 items-center justify-center rounded-xl bg-cyan-500 px-6 text-white transition hover:bg-cyan-600'
            >
              Book Now
            </Link>

            <Link
              href='/destinations'
              className='inline-flex h-12 items-center justify-center rounded-xl border border-gray-300 px-6 text-gray-700 transition hover:bg-gray-50'
            >
              Back to Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
