import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const handleLogin = async (email, password) => {
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
      const user = await response.json();

      if (response.ok) {
        setUser(user);
        console.log("user is set");
        localStorage.setItem("user", JSON.stringify(user));
        console.log("user is in local storage");
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false); // Set loading state to false after initial authentication check
  }, []);

  // Render a loading state if still checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
