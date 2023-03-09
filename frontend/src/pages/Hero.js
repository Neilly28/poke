import React from "react";
// import hero from ".../public/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hero3.jpg)`,
          //   backgroundImage: "url(https://source.unsplash.com/random?pokemon)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="flex flex-col justify-center items-center absolute inset-0">
        <h1 className="text-white font-bold text-5xl text-shadow-md mb-4">
          {"<Pokéhack />"}
        </h1>
        <a href="/home">
          <h2 className="text-white font-bold text-lg text-shadow-md tracking-widest">
            <Link to="/login">Login to Enter</Link>
          </h2>
        </a>
      </div>
    </div>
  );
};

export default Hero;
