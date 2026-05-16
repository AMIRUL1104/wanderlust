export default async function getDestinations() {
  const req = await fetch("http://localhost:4000/destination");
  const res = await req.json();
  return res;
}

export async function getDestinationById(id) {
  const req = await fetch(`http://localhost:4000/destination/${id}`);
  const res = await req.json();
  return res;
}

// export async function getBooking() {
//   const req = await fetch("http://localhost:4000/booking");
//   const res = await req.json();
//   return res;
// }

export async function getBookingById(userId) {
  const req = await fetch(`http://localhost:4000/booking/${userId}`);
  const res = await req.json();
  return res;
}
