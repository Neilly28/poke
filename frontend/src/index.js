import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { PostContextProvider } from "./context/PostContext";
import { AuthContextProvider } from "./context/AuthContext";
import { PokemonContextProvider } from "./context/PokemonContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PokemonContextProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <App />
        </PostContextProvider>
      </AuthContextProvider>
    </PokemonContextProvider>
  </React.StrictMode>
);
