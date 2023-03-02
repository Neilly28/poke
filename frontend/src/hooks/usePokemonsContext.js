import { PokemonsContext } from "../context/PokemonContext";
import { useContext } from "react";

export const usePokemonsContext = () => {
  const context = useContext(PokemonsContext);

  if (!context) {
    throw Error(
      "usePokemonsContext must be used inside an PokemonsContextProvider"
    );
  }

  return context;
};
