"use client";

import { authClient } from "@/lib/auth-client";
import { FiArrowRight } from "react-icons/fi";

function BookingButton({ bookingData, AddBooking }) {
  // login sesion  info
  const { data: session, isPending } = authClient.useSession();
  const userInfo = session?.user;

  // console.log(userInfo);
  // combine bookingData with userInfo to send to backend
  const combinedData = {
    ...bookingData,
    userName: userInfo?.name,
    userEmail: userInfo?.email,
    userId: userInfo?.id,
  };

  return (
    <button
      onClick={() => AddBooking(combinedData)}
      className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
    >
      Book Now <FiArrowRight size={15} />
    </button>
  );
}

export default BookingButton;
