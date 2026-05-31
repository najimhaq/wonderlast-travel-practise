import Image from 'next/image';
import Link from 'next/link';
import { auth } from '../lib/auth';
import { headers } from 'next/headers';
import { FaArrowRightLong } from 'react-icons/fa6';
import { RiMapPin5Line } from 'react-icons/ri';

async function getFeatured(token) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, '');
    const res = await fetch(`${baseUrl}/featured`, {
      cache: 'no-store',
      headers: token ? { authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
      console.log('Featured fetch failed:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export default async function FeaturedPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const featured = await getFeatured(token);

  return (
    <section className='mx-auto max-w-7xl px-4 py-12 md:px-6'>
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600'>
            Handpicked Places
          </p>
          <h1 className='mt-2 text-3xl font-bold text-gray-900 md:text-4xl'>
            Featured Destinations
          </h1>
          <p className='mt-2 max-w-2xl text-gray-600'>
            Discover our most loved places for your next unforgettable journey.
          </p>
        </div>

        <Link
          href='/destinations'
          className='inline-flex items-center gap-2 self-center border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-500 transition hover:bg-cyan-600 hover:text-white'
        >
          <span>All Destinations</span>
          <FaArrowRightLong />
        </Link>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {featured.map((item) => (
          <article
            key={item._id}
            className='group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl'
          >
            <Link href={`/destinations/${item._id}`} className='block'>
              <div className='relative h-64 overflow-hidden'>
                <Image
                  src={item.imageUrl}
                  alt={item.destinationName}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  className='object-cover transition duration-500 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent' />
                <div className='absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-cyan-700 backdrop-blur'>
                  Featured
                </div>
              </div>

              <div className='p-5'>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <RiMapPin5Line className='text-cyan-500' />
                  <span>{item.country}</span>
                </div>

                <h2 className='mt-2 text-xl font-bold text-gray-900'>
                  {item.destinationName}
                </h2>

                <p className='mt-3 line-clamp-3 text-sm leading-6 text-gray-600'>
                  {item.description}
                </p>

                <div className='mt-5 flex items-center justify-between border-t border-gray-100 pt-4'>
                  <div>
                    <p className='text-xs text-gray-400'>Starting from</p>
                    <p className='text-lg font-bold text-gray-900'>
                      ${item.price}
                    </p>
                  </div>

                  <span className='inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-cyan-600'>
                    View Details
                    <FaArrowRightLong className='text-xs' />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
