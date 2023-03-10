import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://pokehack.onrender.com/api/user/signup",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      // console.log("SOMETHING WENT WRONG WITH THE LOGIN / SIGNUP");
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //   update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      navigate("/home");
    }
  };
  return { signup, isLoading, error };
};
