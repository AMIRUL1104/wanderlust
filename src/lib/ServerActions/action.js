import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "../auth-client";
import { revalidatePath } from "next/cache";

export default async function AddDestination(formData) {
  "use server";

  const data = Object.fromEntries(formData.entries());

  let result;

  try {
    const response = await fetch("http://localhost:4000/destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    result = await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }

  // try-catch এর বাইরে redirect
  if (result.insertedId) {
    toast.success("Destination added successfully!");
    redirect("/");
  }

  return result;
}

export async function Updatedestination(id, formData) {
  "use server";
  const UpdatedData = Object.fromEntries(formData.entries());

  console.log(UpdatedData);

  const req = await fetch(`http://localhost:4000/destination/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(UpdatedData),
  });

  const res = await req.json();
  console.log("after update ", res);

  if (res.modifiedCount > 0) {
    redirect(`/destinations/${id}`);
  }

  return res;
}

export async function Deletedestination(destinationId) {
  "use server";

  try {
    if (!destinationId) {
      return { error: "Destination ID is required", deletedCount: 0 };
    }

    const res = await fetch(
      `http://localhost:4000/destination/${destinationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      return {
        error: `Failed to delete destination: ${res.statusText}`,
        deletedCount: 0,
      };
    }

    const result = await res.json();

    return {
      ...result,
      deletedCount: result.deletedCount || 0,
    };
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "Something went wrong while deleting!", deletedCount: 0 };
  }
}

export async function AddBooking(bookingData) {
  "use server";

  // console.log("Booking data received in server action:", bookingData);

  let result;

  try {
    const response = await fetch("http://localhost:4000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    result = await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }

  // try-catch এর বাইরে redirect
  if (result.insertedId) {
    redirect("/my-booking");
  }

  return result;
}

export async function DeleteBooking(bookingId) {
  "use server";

  try {
    if (!bookingId) {
      return { error: "Booking ID is required", deletedCount: 0 };
    }

    const res = await fetch(`http://localhost:4000/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        error: `Failed to delete booking: ${res.statusText}`,
        deletedCount: 0,
      };
    }

    const result = await res.json();
    if (result.deletedCount > 0) {
      revalidatePath("/my-booking");
    }

    console.log("delete : ", result);

    return {
      ...result,
      deletedCount: result.deletedCount || 0,
    };
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "Something went wrong while deleting!", deletedCount: 0 };
  }
}
