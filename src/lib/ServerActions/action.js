import { redirect } from "next/navigation";

export default async function AddDestination(formData) {
  "use server";

  // ১. ডেটা এক্সট্র্যাক্ট করা
  const data = Object.fromEntries(formData.entries());

  try {
    // ২. ডেটা পাঠানোর চেষ্টা করা
    const response = await fetch("http://localhost:4000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // ৩. রেসপন্স স্ট্যাটাস চেক করা
    if (!response.ok) {
      throw new Error("Failed to add destination");
    }

    const result = await response.json();

    if (res.Success.message) {
      redirect("/");
    }

    // ৪. ক্লায়েন্ট সাইডে দেখানোর জন্য রেজাল্ট রিটার্ন করা
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error occurred:", error.message);
    return { error: "Something went wrong!" };
  }
}
