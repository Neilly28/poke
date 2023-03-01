import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    // console.log(email, password);
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="w-1/2 p-5 text-center">
        <h1 className="font-bold text-9xl">Pokéhack</h1>
      </div>

      <div className="w-1/2 px-16  max-w-3xl p-5 flex flex-col justify-center items-center">
        {/* <h2 className="font-bold">Login</h2> */}
        <p className="text-sm mt-4">
          If you are already a trainer, please log in.
        </p>
        <form
          className="flex flex-col justify-center items-center gap-4"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            class="p-2 mt-8 bg-transparent border-b-2 border-black focus:border-black outline-none placeholder-black"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            class="p-2 mt-8 bg-transparent border-b-2 border-black focus:border-black outline-none placeholder-black"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="grid grid-cols-2 gap-5">
            <button
              className="bg-black text-yellow-400 py-2 border border-black transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-black mt-4 p-7"
              disabled={isLoading}
            >
              Login
            </button>
            <button
              className="text-black py-2 border border-black transition duration-300 ease-in-out hover:bg-yellow-400 hover:text-black mt-4"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </div>

          {error && <div>error</div>}
        </form>
        {/* <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-400"></hr>
          <p className="text-center text-sm">OR</p>
          <hr className="border-gray-400" />
        </div>
        <button className="bg-white border py-2 w-1/3 mt-5 flex justify-center">
          Login with Google
        </button> */}
      </div>
    </section>
  );
};

export default Login;
