import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Welcome Section */}
      <motion.h1
        className="welcome-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        👋 Welcome to CRUD Manager
      </motion.h1>

      <motion.p
        className="welcome-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        This app lets you perform full CRUD operations using JSON server and React.
      </motion.p>

      {/* Quick Actions */}
      <div className="quick-actions">
        {[
          { path: "/post", label: "➕ Add New User", cls: "add" },
          { path: "/get", label: "📋 View All Users", cls: "view" },
          { path: "/put", label: "✏️ Update User", cls: "update" },
          { path: "/delete", label: "🗑️ Delete User", cls: "delete" },
        ].map((btn, i) => (
          <motion.div
            key={btn.path}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.2, duration: 0.4 }}
          >
            <Link to={btn.path} className={`btn ${btn.cls}`}>
              {btn.label}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <section className="features">
        <h2>✨ Features</h2>
        <div className="features-grid">
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3>🔍 View Users</h3>
            <p>Easily view and search through all available users.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3>➕ Add Users</h3>
            <p>Quickly add new users with simple and validated forms.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3>✏️ Update Users</h3>
            <p>Update user details instantly with clean UI forms.</p>
          </motion.div>
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3>❌ Delete Users</h3>
            <p>Remove unnecessary records with a single click.</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>ℹ️ About This Project</h2>
        <p>
          This CRUD Manager is built using <b>React + JSON Server</b>, designed
          for managing user records efficiently. It demonstrates all 4 CRUD
          operations with a clean and responsive UI.  
        </p>
      </section>
    </motion.div>
  );
}

export default Home;
