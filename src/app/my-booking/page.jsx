import BookingDeleteButton from "@/components/Booking/BookingDeleteButton";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { DeleteBooking } from "@/lib/ServerActions/action";
import { getBooking, getBookingById } from "@/lib/ServerActions/data";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

/* ── inline SVG icons ─────────────────────────────────────────────────────── */
const IconCalendar = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const IconTicket = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <line x1="13" x2="13" y1="5" y2="19" />
  </svg>
);

const IconEye = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

async function MyBookingPage() {
  // login sesion  info
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userInfo = session?.user;
  const userId = userInfo?.id;
  const BookingData = await getBookingById(userId);
  // console.log(BookingData);

  // যদিকোনো ডেটা না থাকে, তার জন্য একটি সেফগার্ড অ্যারে
  const bookings = Array.isArray(BookingData) ? BookingData : [];

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] font-sans antialiased">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-10 border-b border-gray-100 pb-6">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-gray-900 mb-2">
            My Bookings
          </h1>
          <p className="text-[15px] text-gray-500 font-light">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Bookings List */}
        <div className="flex flex-col gap-6">
          {bookings.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-200 rounded-lg text-gray-400 font-light text-[15px]">
              No active bookings found. Start exploring new destinations!
            </div>
          ) : (
            bookings.map((booking) => {
              // স্ট্যাটাস চেক (আপনার অবজেক্টে স্ট্যাটাস না থাকলে বাই ডিফল্ট 'Confirmed' বা 'Pending' সেট হবে)
              const isPending =
                booking.status === "Pending" || booking.isPending;

              return (
                <div
                  key={booking._id || booking.bookingId}
                  className="bg-white border border-gray-150 p-5 flex flex-col md:flex-row gap-6 items-stretch hover:shadow-md transition-shadow duration-200"
                >
                  {/* Left: Destination Image */}
                  <div className="w-full md:w-[280px] h-[170px] shrink-0 bg-gray-100 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        booking.imageUrl ||
                        booking.image ||
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                      }
                      alt={booking.destinationName || booking.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right: Content & Actions */}
                  <div className="flex-1 flex flex-col justify-between pt-1">
                    <div>
                      {/* Status Badge */}
                      <div className="mb-2">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-600 px-2.5 py-0.5 rounded-full border border-amber-100 uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Confirmed
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                        {booking.destinationName || booking.name}
                      </h2>

                      {/* Details (Date & ID) */}
                      <div className="flex flex-col gap-2 text-[13.5px] text-gray-500 font-light">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">
                            <IconCalendar />
                          </span>
                          <span>
                            Departure:{" "}
                            {booking.departureDate
                              ? new Date(booking.departureDate).toDateString()
                              : "May 15, 2026"}
                          </span>
                          {booking.duration && (
                            <span className="text-gray-300 mx-1">
                              | {booking.duration}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">
                            <IconTicket />
                          </span>
                          <span className="font-mono text-[12.5px]">
                            Booking ID:{" "}
                            {booking._id || booking.bookingId || "b1"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-50 md:border-t-0 md:pt-0">
                      {/* Price */}
                      <div className="text-2xl font-bold text-[#00a3c4] flex items-center">
                        ${booking.price || "1299"}
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center gap-2.5">
                        <BookingDeleteButton
                          bookingId={booking._id}
                          DeleteBooking={DeleteBooking}
                        />

                        <Link
                          href={`/destinations/${booking.bookingId || booking._id}`}
                        >
                          <span className="flex items-center gap-1.5 px-4 py-2 bg-[#00a3c4] text-white text-[13px] font-medium rounded shadow-sm transition-colors duration-150 hover:bg-[#008ba8] cursor-pointer">
                            <IconEye />
                            View
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookingPage;
