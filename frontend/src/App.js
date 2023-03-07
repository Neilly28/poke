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

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          {/* revisit this !!! should navigate to login if no user */}
          <Route
            path="/poke/:id"
            element={user ? <PokemonDetails /> : <Navigate to="/login" />}
          />

          <Route
            path="/ai"
            element={user ? <Community /> : <Navigate to="/login" />}
          />

          <Route
            path="/create-post"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
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
      </Router>
    </div>
  );
}

export default App;
