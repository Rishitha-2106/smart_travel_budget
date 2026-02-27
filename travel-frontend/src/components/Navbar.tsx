import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        Smart Budget Traveler
      </div>

      <div className="profile-section">
        <div
          className="welcome"
          onClick={() => setShowProfile(!showProfile)}
        >
          Welcome 👤
        </div>

        {showProfile && (
          <div className="dropdown">
            <p><strong>Username:</strong> {username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;