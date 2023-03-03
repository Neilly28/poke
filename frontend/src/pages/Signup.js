import React from "react";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    await signup(email, password);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
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
        <button disabled={isLoading}>Sign Up</button>
        {error && <h1>{error}</h1>}
      </form>
    </div>
  );
};

export default Signup;
