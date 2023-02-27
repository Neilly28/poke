import "./App.css";
import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Custom from "./pages/Custom";
import Cards from "./pages/Cards";
import Navbar from "./components/Navbar";
import PokeDetails from "./pages/PokeDetails";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poke/:id" element={<PokeDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/users" element={<Users />}></Route>
          <Route path="/custom" element={<Custom />}></Route>
          <Route path="/cards" element={<Cards />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
