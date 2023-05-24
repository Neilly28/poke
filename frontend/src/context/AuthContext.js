import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false); // Set loading state to false after initial authentication check
  }, []);

  const handleSignup = async (email, password) => {
    setIsLoading(true);
    setSignupError(null);
    try {
      const response = await fetch(
        "https://cute-erin-codfish-sari.cyclic.app/api/user/signup",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();
      console.log({ response });

      if (!response.ok) {
        setIsLoading(false);
        setSignupError(json.error);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        setUser(json);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setLoginError(null);
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
      const json = await response.json();
      console.log({ response });

      if (!response.ok) {
        setIsLoading(false);
        setLoginError(json.error);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        setUser(json);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignup,
        handleLogin,
        handleLogout,
        loginError,
        signupError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
