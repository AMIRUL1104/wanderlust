import { redirect } from "next/navigation";

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

// export async function Deletedestination(destinationId) {
//   "use server";
//   const req = await fetch(
//     `http://localhost:4000/destination/${destinationId}`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json",
//       },
//     },
//   );
//   const res = await req.json();

//   if (res.deletedCount > 0) {
//     redirect("/destinations");
//   }
//   return res;
// }
export async function Deletedestination(destinationId) {
  "use server";

  const req = await fetch(
    `http://localhost:4000/destination/${destinationId}`,
    {
      method: "DELETE",
    },
  );

  return await req.json();
}
