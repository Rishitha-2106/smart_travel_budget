import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./destination.css";

function DestinationDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [destination, setDestination] = useState<any>(null);
  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
    fetchDestination();
    fetchHotels();
  }, []);

  const fetchDestination = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/destination/${id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setDestination(data);
  };

  const fetchHotels = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/hotels/${id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setHotels(data);
  };

  if (!destination) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="destination-container">
        <h1>{destination.name}</h1>

        <img
          src={destination.image}
          alt={destination.name}
          className="destination-image"
        />

        <p>{destination.description}</p>

        <h2>Nearby Hotels</h2>

        <div className="hotel-grid">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <p>₹ {hotel.price_per_night} / night</p>

              <button onClick={() => navigate(`/book/${hotel.id}`)}>
                Book Hotel
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DestinationDetails;