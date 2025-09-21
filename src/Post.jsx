import "./post.css";
import { useState } from "react";

function Post() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const createNewUser = async () => {
    try {
      const url = "http://localhost:3001/users";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, role, city }),
      });
      if (response.ok) {
        setMessage("✅ User added successfully!");
        setId("");
        setName("");
        setRole("");
        setCity("");
      } else {
        setMessage("❌ Failed to add user!");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠ Error occurred!");
    }
  };

  return (
    <div className="post-container">
      <h1 className="title">➕ Add New User</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter Id"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button id="btn" onClick={createNewUser}>
          Submit
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="home-link">
        <a href="/">⬅ Back to Home</a>
      </div>
    </div>
  );
}

export default Post;
