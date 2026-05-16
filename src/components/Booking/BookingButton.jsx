"use client";

import { FiArrowRight } from "react-icons/fi";
// const bookingData = {
//   name: data.destinationName,
//   price: data.price,
//   image: data.imageUrl,
//   departureDate: data.departureDate,
//   duration: data.duration,
//   country: data.country,
//   bookingId: data._id,
// };
function BookingButton({ bookingData }) {
  return (
    <button className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
      Book Now <FiArrowRight size={15} />
    </button>
  );
}

export default BookingButton;
