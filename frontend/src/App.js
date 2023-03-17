import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
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
// import NavbarGuest from "./components/NavbarGuest";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
  // fetch("http://localhost:4000/mcdo")
  //   .then((res) => res.json())
  //   .then((res) => console.log(res));

  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Home />} />
          <Route path="/poke/:id" element={<PokemonDetails />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route
            path="/ai"
            element={user ? <Community /> : <NotAuthorized />}
          />
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
