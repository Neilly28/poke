import { createContext, useReducer } from "react";

export const PokemonsContext = createContext();

export const pokemonsReducer = (state, action) => {
  switch (action.type) {
    case "SET_POKEMONS":
      return {
        pokemons: action.payload,
      };
    case "CREATE_POKEMON":
      return {
        pokemons: [action.payload, ...state.pokemons],
      };
    case "DELETE_POKEMON":
      return {
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const PokemonsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonsReducer, {
    pokemons: null,
  });

  return (
    <PokemonsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PokemonsContext.Provider>
  );
};
