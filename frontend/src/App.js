import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPokemon from "./pages/MyPokemon";
import PokemonDetails from "./pages/PokemonDetails";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { AiHome, CreatePost } from "./pages";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          {/* revisit this !!! should navigate to login if no user */}
          <Route
            path="/mypokemon"
            element={user ? <MyPokemon /> : <Navigate to="/login" />}
          />
          <Route
            path="/poke/:id"
            element={user ? <PokemonDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/ai"
            element={user ? <AiHome /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-post"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          {/* <Route path="/mypokemon" element={<MyPokemon />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
