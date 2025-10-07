import React, { useState } from "react";
import "./post.css";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

function Post() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    city: ""
  });

  // ✅ Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Async/Await Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      await response.json();
      alert("✅ User Added Successfully");

      // Reset form after submit
      setFormData({ id: "", name: "", role: "", city: "" });
    } catch (error) {
      console.error("Failed to add user:", error);
      alert("❌ Failed to add user. Please try again.");
    }
  };

  return (
    <div className="post-container">
      <h2 className="title">➕ Add New User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Enter Id"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {/* ✅ Back to Home */}
      <div className="home-link">
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
}

export default Post;
