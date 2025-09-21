import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>🔄 Welcome to CRUD Manager</h1>
      <p>This app lets you perform full CRUD operations using JSON server and React.</p>

      <div className="quick-actions">
        <Link to="/post" className="btn">➕ Add New User</Link>
        <Link to="/get" className="btn">📋 View All Users</Link>

      </div>

      <div className="info-section">
        <h2>🛠 What you can do:</h2>
        <ul>
          <li><strong>GET:</strong> View all users</li>
          <li><strong>POST:</strong> Add a new user</li>
          <li><strong>PUT:</strong> Edit an existing user</li>
          <li><strong>DELETE:</strong> Remove a user</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
