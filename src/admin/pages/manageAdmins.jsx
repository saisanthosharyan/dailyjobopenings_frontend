import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/adminnavbar";

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins");
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Admin deleted");
      fetchAdmins();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div style={{ padding: "30px" }}>
        <h2>Manage Admins</h2>

        {admins.map((admin) => (
          <div key={admin._id} style={cardStyle}>
            <p>{admin.email}</p>
            <p>Role: {admin.role}</p>

            <button onClick={() => deleteAdmin(admin._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  padding: "15px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px"
};

export default Admins;