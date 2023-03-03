import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    await login(email, password);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>Login</button>
        {error && <h1>{error}</h1>}
      </form>
    </div>
  );
};

export default Login;
