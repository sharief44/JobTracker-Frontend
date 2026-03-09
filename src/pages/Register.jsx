import { useState } from "react";
import axios from "../api/axios";
import "../styles/login.css";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("/users/register", {
        name,
        email,
        password,
      });

      alert("User registered successfully");

      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="blur-circle"></div>

      <div className="login-card">
        <h2 className="login-title">Create Account</h2>

        <input
          className="login-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleRegister}>
          Register
        </button>

        <p className="login-footer">
          Have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
