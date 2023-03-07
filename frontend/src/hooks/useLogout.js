import { useAuthContext } from "./useAuthContext";
import { usePokemonsContext } from "./usePokemonsContext";
import { usePostContext } from "./usePostContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
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

    // navigate to login
    navigate("/");
  };

  return { logout };
};
