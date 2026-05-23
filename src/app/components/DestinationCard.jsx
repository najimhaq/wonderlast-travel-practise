import Image from 'next/image';
import Link from 'next/link';

const DestinationCard = ({ destination }) => {
  const {
    _id,
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
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
      <div className='relative h-56 w-full'>
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className='object-cover'
        />
      </div>

      <div className='p-5'>
        <div className='mb-3 flex items-center justify-between gap-3'>
          <span className='rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-600'>
            {category}
          </span>
          <span className='text-lg font-bold text-cyan-600'>${price}</span>
        </div>

        <h2 className='line-clamp-1 text-xl font-semibold text-gray-800'>
          {destinationName}
        </h2>

        <p className='mt-1 text-sm text-gray-500'>{country}</p>

        <div className='mt-4 space-y-2 text-sm text-gray-600'>
          <p>
            <span className='font-medium text-gray-800'>Duration:</span>{' '}
            {duration}
          </p>
          <p>
            <span className='font-medium text-gray-800'>Departure:</span>{' '}
            {new Date(departureDate).toLocaleDateString()}
          </p>
        </div>

        <p className='mt-4 line-clamp-3 text-sm leading-6 text-gray-600'>
          {description}
        </p>

        <Link
          href={`/destinations/${_id}`}
          className='mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-white transition hover:bg-cyan-600'
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
