import React, { useState, useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE; 

const Header = () => {
  const [theme, setTheme] = useState('light');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // GET users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Theme toggle
  // inside Header component
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.body.className = newTheme;  // ✅ sahi hai
};


  // Toggle users dropdown
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  // Edit user
  const handleEdit = (id, name) => {
    setEditingUserId(id);
    setEditedName(name);
  };

  // Save updated user
  const saveName = async (id) => {
    try {
      await fetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name: editedName }),
      });
      setEditingUserId(null);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">🔄 CRUD-Opn</div>

      {/* Menu */}
      <div className="menu">
        <Link to="/get"><button>GET</button></Link>
        <Link to="/post"><button>POST</button></Link>
        <Link to="/put"><button>PUT</button></Link>
        <Link to="/delete"><button>DELETE</button></Link>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search"
      />

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Users Dropdown */}
      <div className="users-dropdown">
        <span onClick={toggleDropdown} className="dropdown-toggle">
          Users ⬇
        </span>

        {showDropdown && (
          <ul>
            {users
              .filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase())
              )
              .map(user => (
                <li key={user.id}>
                  {editingUserId === user.id ? (
                    <>
                      <input
                        value={editedName}
                        onChange={e => setEditedName(e.target.value)}
                      />
                      <button onClick={() => saveName(user.id)}>Save</button>
                    </>
                  ) : (
                    <>
                      {user.name}
                      <button onClick={() => handleEdit(user.id, user.name)}>✏️</button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
