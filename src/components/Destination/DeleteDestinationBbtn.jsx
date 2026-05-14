// "use client";

// import React from "react";
// import { FiXCircle } from "react-icons/fi";

// function DeleteDestinationBbtn({ id, Deletedestination }) {
//   return (
//     <button
//       onClick={() => Deletedestination(id)}
//       className="flex items-center gap-1.5 text-sm border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
//     >
//       <FiXCircle size={13} />
//       Cancel
//     </button>
//   );
// }

// export default DeleteDestinationBbtn;
"use client";

import { useRouter } from "next/navigation";
import { FiXCircle } from "react-icons/fi";

function DeleteDestinationBbtn({ id, Deletedestination }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await Deletedestination(id);

    if (res.deletedCount > 0) {
      router.push("/destinations");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-1.5 text-sm border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
    >
      <FiXCircle size={13} />
      Cancel
    </button>
  );
}

export default DeleteDestinationBbtn;
