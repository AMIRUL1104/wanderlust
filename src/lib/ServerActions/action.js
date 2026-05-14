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