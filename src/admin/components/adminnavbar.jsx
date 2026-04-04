import { Link, useNavigate } from "react-router-dom";

const admin =  JSON.parse(localStorage.getItem("adminInfo"));

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  return (
    <div style={{
      background: "#2c3855",
      color: "#fff",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h3>Admin Panel</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
        <Link to="/admin/manage-jobs" style={{ color: "#fff" }}>Manage Jobs</Link>
{admin?.role === "super_admin" && (
  <Link to="/admin/manage-admins" style={{ color: "#fff" }}>
    Manage Admins
  </Link>
)}

        <button onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;