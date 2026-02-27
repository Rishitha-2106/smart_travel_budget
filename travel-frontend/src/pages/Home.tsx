import "./home.css";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
function Home() {
  const navigate = useNavigate();

  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState("");
  const [type, setType] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

 useEffect(() => {
    const savedInputs = localStorage.getItem("trip_inputs");
    const savedSuggestions = localStorage.getItem("trip_suggestions");

    if (savedInputs) {
      const inputs = JSON.parse(savedInputs);
      setBudget(inputs.budget);
      setPeople(inputs.people);
      setType(inputs.travel_type);
    }

    if (savedSuggestions) {
      setSuggestions(JSON.parse(savedSuggestions));
    }
  }, []);
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
const fetchSuggestions = async () => {
  setHasSearched(true);

  if (Number(budget) < 5000) {
    alert("Minimum budget should be at least ₹5000");
    return;
  }

  if (!budget || !type) {
    alert("Please fill all fields");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://127.0.0.1:8000/api/suggestions/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          budget: Number(budget),
          people: Number(people),
          travel_type: type.toLowerCase(),
        }),
      }
    );

    const data = await response.json();
    setSuggestions(data);

    // ✅ SAVE TO LOCAL STORAGE
    localStorage.setItem(
      "trip_inputs",
      JSON.stringify({
        budget,
        people,
        travel_type: type,
      })
    );

    localStorage.setItem(
      "trip_suggestions",
      JSON.stringify(data)
    );

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">Smart Budget Traveler</div>

        <div className="profile-section">
          <div
            className="welcome"
            onClick={() => setShowProfile(!showProfile)}
          >
            Welcome👤
          </div>

          {showProfile && (
            <div className="dropdown">
              <p><strong>Username:</strong> {username}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <h2>Plan Your Trip</h2>
<input
  type="number"
  placeholder="Enter Budget"
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
/>

<input
  type="number"
  placeholder="Number of People"
  value={people}
  onChange={(e) => setPeople(e.target.value)}
/>

<select value={type} onChange={(e) => setType(e.target.value)}>
  <option value="">Select Travel Type</option>
  <option value="solo">Solo</option>
  <option value="friends">Friends</option>
  <option value="family">Family</option>
  <option value="couple">Couple</option>
</select>

        <button onClick={fetchSuggestions}>Get Suggestions</button>
<button
  className="clear-btn"
  onClick={() => {
    setBudget("");
    setPeople("");
    setType("");
    setSuggestions([]);
    localStorage.removeItem("trip_inputs");
    localStorage.removeItem("trip_suggestions");
  }}
>
  Clear
</button>
      </div>

      {/* Suggestions */}
 
<div className="suggestions-container">
  {suggestions.map((item) => (
    <div
      key={item.id}
      className="trip-card"
      onClick={() => navigate(`/destination/${item.id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  ))}
  {hasSearched && suggestions.length === 0 && (
  <p className="no-suggestions">
    No suggestions found 😔 <br />
    Try increasing your budget
  </p>
)}
</div>

    </div>
  );
}

export default Home;