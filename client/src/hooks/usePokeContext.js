import { PokemonContext } from "../context/PokeContext";
import { useContext } from "react";

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw Error(
      "usePokemonContext must be used inside a PokemonContextProvider"
    );
  }

  return context;
};
