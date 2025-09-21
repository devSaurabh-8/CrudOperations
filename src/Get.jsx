import React, { useEffect, useState } from "react";
import "./get.css";

function Get() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
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
