import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        navigate("/home");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hero3.webp)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="flex flex-col justify-center items-center absolute inset-0">
        <h1 className="text-white font-bold text-4xl sm:text-7xl text-shadow-md mb-4">
          {"<Pokéhack />"}
        </h1>
        <h2 className="text-white font-bold text-md sm:text-lg text-shadow-md tracking-widest">
          <Link to="/home">Press Enter</Link>
        </h2>
      </div>
    </div>
  );
};

export default Hero;
