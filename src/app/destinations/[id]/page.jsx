async function DestinationDetailsPage({ params }) {
  const { id } = await params();
  console.log(id);

  return <div>DestinationDetailsPage</div>;
}

export default DestinationDetailsPage;
