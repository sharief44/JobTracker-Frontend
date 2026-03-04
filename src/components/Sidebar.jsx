import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/");
  };

  return (
    <div className="sidebar">
      {/* Top section */}
      <div>
        <div className="sidebar-title">JobTracker</div>

        {/* User info */}
        <div className="sidebar-user">
          <div className="user-name">{name}</div>
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

      {/* Logout bottom */}
      <div className="sidebar-logout">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
