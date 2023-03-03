import { useAuthContext } from "./useAuthContext";
import { usePokemonsContext } from "./usePokemonsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: pokemonsDispatch } = usePokemonsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    pokemonsDispatch({ type: "SET_POKEMONS", payload: null });
  };

  return { logout };
};
