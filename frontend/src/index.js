import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { PostContextProvider } from "./context/PostContext";
import { AuthContextProvider } from "./context/AuthContext";
import { PokemonContextProvider } from "./context/PokemonContext";
import { AiContextProvider } from "./context/AiContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PokemonContextProvider>
      <AuthContextProvider>
        <AiContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </AiContextProvider>
      </AuthContextProvider>
    </PokemonContextProvider>
  </React.StrictMode>
);
