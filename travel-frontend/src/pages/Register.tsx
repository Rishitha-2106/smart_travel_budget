import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Reusing same beautiful styling

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! Please login.");
      navigate("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand-title">Smart Budget Traveler ✈️</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;