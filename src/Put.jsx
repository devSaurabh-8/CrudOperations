import "./put.css";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

function Put() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", role: "", city: "" });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Start editing
  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditedUser({ name: user.name, role: user.role, city: user.city });
  };

  // Save update
  const saveUser = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...editedUser }),
      });
      if (res.ok) {
        alert("✅ User updated successfully!");
        setEditingId(null);
        fetchUsers();
      } else {
        alert("❌ Failed to update user!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠ Error occurred!");
    }
  };

  return (
    <div className="put-container">
      <h1 className="title">✏️ Update Users</h1>
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
              <td>
                {editingId === user.id ? (
                  <input
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    value={editedUser.role}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, role: e.target.value })
                    }
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    value={editedUser.city}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, city: e.target.value })
                    }
                  />
                ) : (
                  user.city
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <button onClick={() => saveUser(user.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
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

export default Put;
