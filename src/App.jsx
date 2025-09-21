import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Get from "./Get";
import Post from "./Post";
import Put from "./Put";
import Delete from "./Delete";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get" element={<Get />} />
          <Route path="/post" element={<Post />} />
          <Route path="/put" element={<Put />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
