import { EditForm } from "@/components/Destination/EditForm";
import { getDestinationById } from "@/lib/ServerActions/data";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiXCircle,
  FiMapPin,
  FiStar,
  FiClock,
  FiCalendar,
  FiCheckCircle,
  FiArrowRight,
  FiShield,
  FiPhone,
} from "react-icons/fi";
import { Updatedestination } from "@/lib/ServerActions/action";
import DeleteDestinationBbtn from "@/components/Destination/DeleteDestinationBbtn";
import { Deletedestination } from "@/lib/ServerActions/action";
import { AddBooking } from "@/lib/ServerActions/action";

import BookingButton from "@/components/Booking/BookingButton";
async function DestinationDetailsPage({ params }) {
  const { id } = await params;
  const data = await getDestinationById(id);

  // keep some data in a object to pass booking page . name,price,image,departure date, duration, country ,booking id,
  const bookingData = {
    name: data.destinationName,
    price: data.price,
    image: data.imageUrl,
    departureDate: data.departureDate,
    duration: data.duration,
    country: data.country,
    bookingId: data._id,
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Destination not found!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/destinations"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft size={15} />
          Back to Destinations
        </Link>
        <div className="flex items-center gap-2">
          {/* edit modal  */}
          <EditForm data={data} Updatedestination={Updatedestination} />

          <DeleteDestinationBbtn
            id={data._id}
            Deletedestination={Deletedestination}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-6 border border-gray-100">
        <Image
          src={data.imageUrl}
          alt={data.destinationName}
          fill
          className="object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left */}
        <div className="flex-1 space-y-6">
          {/* Country */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <FiMapPin size={14} className="text-cyan-500" />
            <span className="capitalize">{data.country}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 capitalize leading-snug -mt-2">
            {data.destinationName}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <FiStar size={14} className="text-green-500 fill-green-400" />
              <span className="font-medium text-gray-700">4.9</span>
              <span>(234 reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock size={14} className="text-cyan-500" />
              {data.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-cyan-50 text-cyan-600 px-2.5 py-1 rounded-full text-xs font-medium">
              {data.category}
            </span>
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1.5">
              Overview
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Highlights */}
          {data.highlights?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <FiCheckCircle
                      size={15}
                      className="text-cyan-500 mt-0.5 shrink-0"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary */}
          {data.itinerary?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Itinerary
              </h2>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

                <div className="space-y-4">
                  {data.itinerary.map((item, i) => (
                    <div key={i} className="relative flex gap-4 pl-12">
                      {/* Step circle */}
                      <div className="absolute left-0 flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white text-xs font-bold shrink-0 z-10">
                        {item.day}
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-cyan-600 mb-0.5">
                          Day {item.day}
                        </p>
                        <p className="text-sm text-gray-700">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right — Booking Card */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm sticky top-6">
            {/* Price */}
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
              <p className="text-3xl font-bold text-cyan-500">${data.price}</p>
              <p className="text-xs text-gray-400">per person</p>
            </div>

            {/* Departure Date */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
              <FiCalendar size={14} className="text-gray-400" />
              {new Date(data.departureDate).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </div>

            {/* Book Button */}
            {/* <button className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
              Book Now <FiArrowRight size={15} />
            </button> */}
            <BookingButton bookingData={bookingData} AddBooking={AddBooking} />

            {/* Perks */}
            <div className="space-y-2 pt-1">
              {[
                { icon: FiCheckCircle, text: "Free cancellation up to 7 days" },
                { icon: FiShield, text: "Travel insurance included" },
                { icon: FiPhone, text: "24/7 customer support" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <Icon size={13} className="text-green-500 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetailsPage;
