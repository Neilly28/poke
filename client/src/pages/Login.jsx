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
    <>
      <h1 className="font-bold text-9xl">Pokéhack</h1>

      <section className="flex justify-center items-center h-screen">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          {/* form */}
          <div className="w-1/2 px-16">
            <h2 className="font-bold">Login</h2>
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
                className="p-2 mt-8"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <input
                type="password"
                placeholder="Password"
                className="p-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="bg-[#f7da34] rounded-xl text-white py-2 w-full text-black"
                disabled={isLoading}
              >
                Login
              </button>
              {error && <div>error</div>}
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400"></hr>
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center">
              Login with Google
            </button>
          </div>

          {/* image */}

          <div className="w-1/2 p-5">
            <img src="" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
