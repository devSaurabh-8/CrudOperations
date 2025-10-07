import "./put.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

function Put() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", role: "", city: "" });

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Start editing
  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditedUser({ name: user.name, role: user.role, city: user.city });
  };

  // ✅ Save update
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
      console.error("Error updating user:", err);
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
          <AnimatePresence>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
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
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => saveUser(user.id)}
                    >
                      Save
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </motion.button>
                  )}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {/* ✅ Back to Home */}
      <div className="home-link">
        <Link to="/">⬅ Back to Home</Link>
      </div>
    </div>
  );
}

export default Put;
