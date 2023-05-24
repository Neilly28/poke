import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const { login } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cute-erin-codfish-sari.cyclic.app/api/user/login",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const user = await response.json();

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Update the auth context
      login(user);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return { handleLogin, isLoading, error };
};
