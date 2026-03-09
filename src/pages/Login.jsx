import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.name);

      if (res.data.role === "ADMIN") {
        navigate("/analytics");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div class="blur-circle"></div>
      <div className="login-card">
        <h2 className="login-title">Job Tracker Login</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p className="login-footer">
          Don't Have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
