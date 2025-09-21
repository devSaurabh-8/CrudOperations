import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} CRUD App. All Rights Reserved.</p>
        <div className="footer-links">
          {/* Internal Links with Link */}
          <Link to="/">Home</Link>
          <Link to="/get">Get Users</Link>
          <Link to="/post">Add User</Link>

          {/* External links use <a> */}
          <a href="https://github.com/saurabhcodes003" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/saurabh-pandey-492929264" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
