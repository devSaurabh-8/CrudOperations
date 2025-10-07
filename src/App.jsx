import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Get from "./Get";
import Post from "./Post";
import Put from "./Put";
import Delete from "./Delete";
import "./App.css";
import "./theme.css";   // 👈 yeh last hona chahiye

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get" element={<Get />} />
            <Route path="/post" element={<Post />} />
            <Route path="/put" element={<Put />} />
            <Route path="/delete" element={<Delete />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
