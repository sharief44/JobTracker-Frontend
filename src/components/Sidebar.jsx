import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/users/me");

      setUsername(res.data.name); // important
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="sidebar">
      {/* Top section */}
      <div>
        <div className="sidebar-title">JobTracker</div>

        <div className="sidebar-user">
          <div className="user-name">{username}</div>
          <div className="user-role">{role}</div>
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/dashboard">My Jobs</Link>
          </li>

          {role === "ADMIN" && (
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Logout */}
      <div className="sidebar-logout">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
