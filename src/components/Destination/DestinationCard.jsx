import Image from "next/image";
import Link from "next/link";
import React from "react";

function DestinationCard({ destination }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={destination.imageUrl}
          alt={destination.destinationName}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {destination.category}
          </span>
          <span className="text-sm font-semibold text-green-600">
            ${destination.price}
          </span>
        </div>

        <h2 className="font-semibold text-gray-900 capitalize leading-snug">
          {destination.destinationName}
        </h2>

        <p className="text-xs text-gray-500 capitalize">
          {destination.country}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
          <span>⏱ {destination.duration}</span>
          <span>
            📅{" "}
            {new Date(destination.departureDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* detail button for booking */}
        <Link
          className=" hover:underline text-cyan-500 "
          href={`/destination/${destination._id}`}
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;
