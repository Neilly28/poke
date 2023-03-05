import React from "react";

const CardNew = ({ _id, name, prompt, photo, type }) => {
  const colours = {
    normal: "bg-[#A8A77A]",
    fire: "bg-[#EE8130]",
    water: "bg-[#6390F0]",
    electric: "bg-[#F7D02C]",
    grass: "bg-[#7AC74C]",
    ice: "bg-[#96D9D6]",
    fighting: "bg-[#C22E28]",
    poison: "bg-[#A33EA1]",
    ground: "bg-[#E2BF65]",
    flying: "bg-[#A98FF3]",
    psychic: "bg-[#F95587]",
    bug: "bg-[#A6B91A]",
    rock: "bg-[#B6A136]",
    ghost: "bg-[#735797]",
    dragon: "bg-[#6F35FC]",
    dark: "bg-[#705746]",
    steel: "bg-[#B7B7CE]",
    fairy: "bg-[#D685AD]",
  };

  return (
    <div
      className={`rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col justify-center items-center relative bg-white`}
    >
      <img className="w-250 h-250 object-cover mb-4" src={photo} alt={prompt} />
      <div className="w-full h-16 p-2 capitalize text-lg font-bold text-black flex items-center justify-center">
        {name}
      </div>

      {type ? (
        <div
          className={`px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl mb-8 ${
            colours[type.toLowerCase()]
          }`}
        >
          {type}
        </div>
      ) : (
        <div
          className={"p-2 capitalize text-sm font-bold text-white rounded-3xl"}
        >
          <p>Normal</p>
        </div>
      )}

      <div className="w-full h-16 p-4 capitalize text-sm font-semibold text-black flex items-center justify-center">
        {prompt}
      </div>
    </div>
  );
};
export default CardNew;
