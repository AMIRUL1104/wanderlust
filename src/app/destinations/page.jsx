import DestinationCard from "@/components/Destination/DestinationCard";
import getDestinations from "@/lib/ServerActions/data";
import Image from "next/image";

async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Explore <span className="text-cyan-500">Destinations</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Discover handpicked destinations around the world — from serene
          beaches to thrilling adventures.
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Category */}
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer">
          <option value="">All Categories</option>
          <option value="Adventure">Adventure</option>
          <option value="Beach">Beach</option>
          <option value="Cultural">Cultural</option>
          <option value="Nature">Nature</option>
          <option value="City">City</option>
        </select>

        {/* Price Range */}
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer">
          <option value="">Any Price</option>
          <option value="0-500">$0 – $500</option>
          <option value="500-1000">$500 – $1,000</option>
          <option value="1000-2000">$1,000 – $2,000</option>
          <option value="2000+">$2,000+</option>
        </select>

        {/* Sort By */}
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer">
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="date-asc">Departure: Earliest</option>
          <option value="date-desc">Departure: Latest</option>
          <option value="name-asc">Name: A – Z</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
}

export default DestinationsPage;
