import React from "react";
import psyduck from "../assets/psyduck.gif";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <img src={psyduck} alt="" />
      <h1 className="text-4xl font-bold mt-12">
        Error 404: Pokémon not found. Looks like Team Rocket stole this page!
      </h1>
    </div>
  );
};

export default Error;
