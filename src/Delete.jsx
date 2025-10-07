import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./delete.css";

const API_BASE = import.meta.env.VITE_API_BASE;

function Delete() {
  const [users, setUsers] = useState([]);


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="delete-container">
      <h2 className="title">🗑 Delete Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>ROLE</th>
            <th>CITY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {users.length > 0 ? (
              users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.city}</td>
                  <td>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "#e53935",
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                  No Users Found
                </td>
              </tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
      <div className="home-link">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}

export default Delete;
