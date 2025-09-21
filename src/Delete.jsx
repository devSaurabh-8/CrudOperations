import "./delete.css";
import { useEffect, useState } from "react";

function Delete() {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("🗑️ User deleted successfully!");
        fetchUsers();
      } else {
        alert("❌ Failed to delete user!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠ Error occurred!");
    }
  };

  return (
    <div className="delete-container">
      <h1 className="title">🗑️ Delete Users</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.city}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="home-link">
        <a href="/">⬅ Back to Home</a>
      </div>
    </div>
  );
}

export default Delete;
