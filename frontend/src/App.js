import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";
import Create from "./pages/Create";
import Community from "./pages/Community";
import Home from "./pages/Home";
import SignInSide from "./pages/Login";
import Error from "./pages/Error";
import Details from "./pages/Details";
import SignUp from "./pages/Signup";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pokemon/:id" element={<Details />} />
          <Route path="/create" element={<Create />} />
          <Route path="/community" element={<Community />} />
          <Route
            path="/login"
            element={!user ? <SignInSide /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/home" />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
