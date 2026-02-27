import { useParams } from "react-router-dom";

function TripDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Trip Details</h2>
      <p>Trip ID: {id}</p>
    </div>
  );
}

export default TripDetails;