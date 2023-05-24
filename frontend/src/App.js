import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/HomePage";
import SignInSide from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import PokemonDetails from "./pages/PokemonDetailsPage";
import NotFound from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/AiPage";
import Community from "./pages/CommunityPage";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Home />} />
          <Route path="/poke/:id" element={<PokemonDetails />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/ai" element={<Community />} />
          <Route
            path="/login"
            element={!user ? <SignInSide /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
