import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getDestination(id) {
  try {
    const res = await fetch(`http://localhost:5050/destination/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.data || null;

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
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
        <div className='relative h-[300px] overflow-hidden rounded-2xl md:h-[450px]'>
          <Image
            src={imageUrl}
            alt={destinationName}
            fill
            className='object-cover'
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

// generateStaticParams - এটাও ঠিক করতে হবে
export async function generateStaticParams() {
  try {
    const res = await fetch('http://localhost:5050/destinations');
    const data = await res.json();

    // আপনার API যদি রিটার্ন করে: { success: true, data: [...] }
    const destinations = data.data || data;

    return destinations.map((destination) => ({
      id: destination._id.toString(),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return []; // error হলে খালি array রিটার্ন করুন
  }
}
