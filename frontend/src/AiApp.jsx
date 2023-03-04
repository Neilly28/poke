import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiHome, CreatePost } from "./pages";

const AiApp = () => {
  return (
    <Router>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src="hello" alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post">Create</Link>
      </header>
      <main className="sm:p-8">
        <Routes>
          <Route path="/" element={<AiHome />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </Router>
  );
};

export default AiApp;
