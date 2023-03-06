import { useAuthContext } from "./useAuthContext";
import { usePokemonsContext } from "./usePokemonsContext";
import { usePostContext } from "./usePostContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: pokemonsDispatch } = usePokemonsContext();
  const { dispatch: postDispatch } = usePostContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    pokemonsDispatch({ type: "SET_POKEMONS", payload: null });
    postDispatch({ type: "SET_POST", payload: null });
  };

  return { logout };
};
