import React, { useEffect, useState } from "react";
import "./get.css";

const API_BASE = import.meta.env.VITE_API_BASE;

function Get() {
  const [users, setUsers] = useState([]);

  // ✅ Ek reusable function banaya
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: "GET", // HTTP method
        headers: {
          "Content-Type": "application/json", // server ko bol rahe hain ki JSON data chahiye
          Accept: "application/json", // bata rahe hain ki hum JSON accept karenge
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // agar server 404, 500 de to
      }

      const data = await response.json(); // response ko JSON mein parse kiya
      setUsers(data); // state update
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // ✅ useEffect ke andar sirf function call
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="get-container">
      <h1 className="title">📋 User Data</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "15px" }}>
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="home-link">
        <a href="/">⬅ Back to Home</a>
      </div>
    </div>
  );
}

export default Get;
