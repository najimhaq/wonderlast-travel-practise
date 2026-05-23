import DestinationCard from "../components/DestinationCard";

const Destinations = async () => {
  const res = await fetch('http://localhost:5050/destination', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch destinations');
  }

  const result = await res.json();

  const destinations = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.destinations)
        ? result.destinations
        : [];

  return (
    <div>
      <div>
        <h1 className='mt-6 text-3xl font-bold text-cyan-600 md:text-4xl text-center'>
          Destinations
        </h1>
        <p className='mb-8 text-center text-sm text-gray-500 md:text-base'>
          Explore our curated travel packages to your dream destinations.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {destinations.map((destination) => (
          <div
            key={destination._id}
            className='rounded-2xl border border-gray-200 p-4 shadow-sm mb-8'
          >
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
