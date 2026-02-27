import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Booking.css";

function BookHotel() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/book-hotel/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        hotel: Number(id),
        name,
        email,
        phone,
      }),
    });

    if (response.ok) {
      alert("Booked successfully 🎉");
    } else {
      alert("Booking failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="booking-container">
        <div className="booking-card">
          <h1 className="brand-title">Hotel Booking 🏨</h1>

          <form onSubmit={handleBooking}>
            <input
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />

            <button type="submit">Book Now</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookHotel;