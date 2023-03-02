import { createContext, useReducer } from "react";

export const PokemonContext = createContext();

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case "SET_POKEMON":
      return {
        pokemon: action.payload,
      };
    case "CREATE_POKEMON":
      return {
        pokemon: [action.payload, ...state.pokemon],
      };
    case "DELETE_POKEMON":
      return {
        pokemon: state.pokemon.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PokemonContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, {
    pokemon: null,
  });

  return (
    <PokemonContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};
