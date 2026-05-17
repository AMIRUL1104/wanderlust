"use client";
import { TbTrash } from "react-icons/tb";

function BookingDeleteButton({ bookingId, DeleteBooking }) {
  return (
    <button
      onClick={() => DeleteBooking(bookingId)}
      type="button"
      className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 text-[13px] font-medium rounded transition-colors duration-150 hover:bg-red-50 cursor-pointer"
    >
      {/* <IconTrash /> */}
      <TbTrash />
      Cancel
    </button>
  );
}

export default BookingDeleteButton;
