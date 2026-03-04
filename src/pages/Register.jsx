import { useState } from "react";
import axios from "../api/axios";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post("/users/register", {
      name,
      email,
      password,
    });

    alert("User registered successfully");

    navigate("/");
  };

  return (
    <div className="login-container">
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
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Have an account?
          <a href="/" style={{ color: "#2563eb" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
