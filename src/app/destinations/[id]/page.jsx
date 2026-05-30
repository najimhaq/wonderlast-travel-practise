import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { RiMapPin5Line } from 'react-icons/ri';
import { EditModal } from '../../components/EditModal';
import { DeleteDestination } from '../../components/DeleteDestination';
import BookingCard from '../../components/BookingCard';

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
      {/* Header */}
      <div className='mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between'>
        <Link
          href='/destinations'
          className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-cyan-600'
        >
          <FaArrowLeft className='text-sm' />
          <span>Back To Destinations</span>
        </Link>

        <div className='flex items-center gap-3'>
          <EditModal destination={destination} />
          <DeleteDestination destination={destination} />
        </div>
      </div>

      {/* Hero Image */}
      <div className='relative mb-10 h-[280px] overflow-hidden rounded-2xl md:h-[420px]'>
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          sizes='(max-width: 768px) 100vw, 1200px'
          className='object-cover'
          priority
        />
      </div>

      {/* Content */}
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_380px]'>
        {/* Left Content */}
        <div>
          <span className='mb-4 inline-block w-fit rounded-full bg-cyan-50 px-4 py-1 text-sm font-medium text-cyan-600'>
            {category}
          </span>

          <h1 className='text-3xl font-bold text-gray-800 md:text-4xl'>
            {destinationName}
          </h1>

          <p className='mt-3 inline-flex items-center gap-2 text-lg text-gray-500'>
            <RiMapPin5Line className='text-cyan-500' />
            <span>{country}</span>
          </p>

          <div className='mt-6 space-y-3 text-gray-700'>
            <p>
              <span className='font-semibold'>Price:</span> Starting per person
              ${price}
            </p>
            <p>
              <span className='font-semibold'>Duration:</span> {duration}
            </p>
            <p>
              <span className='font-semibold'>Departure Date:</span>{' '}
              {new Date(departureDate).toLocaleDateString()}
            </p>
          </div>

          <div className='mt-8'>
            <h2 className='mb-3 text-2xl font-semibold text-gray-800'>
              Overview
            </h2>
            <p className='leading-7 text-gray-600'>{description}</p>
          </div>

          <div className='mt-6'>
            <Link
              href='/destinations'
              className='inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-cyan-600'
            >
              <FaArrowLeft className='text-sm' />
              <span>Back To Destinations</span>
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='lg:sticky lg:top-24 h-fit'>
          <BookingCard destination={destination} />
        </div>
      </div>
    </div>
  );
}
