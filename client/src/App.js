import "./App.css";
import axios from "axios";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Custom from "./pages/Custom";
import Cards from "./pages/Cards";
import Navbar from "./components/Navbar";
import PokeDetails from "./pages/PokeDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
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
