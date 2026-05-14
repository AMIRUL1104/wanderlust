export default async function getDestinations() {
    const req = await  fetch("http://localhost:4000/destination");
    const res = await req.json();
    return res
}