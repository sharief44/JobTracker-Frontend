import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data);

      // Decode role from token later
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;