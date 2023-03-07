import React from "react";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const AiCard = ({ _id, name, prompt, photo, type }) => {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = async () => {
    if (!user || user.email !== "admin@mail.com") {
      return;
    }
    const response = await fetch("/api/v1/post/" + _id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POKEMON", payload: json });
      setIsDeleted(true);
    }
  };

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

  if (isDeleted) {
    return null; // Don't render anything if card has been deleted
  }

  return (
    <div
      className={
        "rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col justify-center items-center relative bg-white"
      }
    >
      <img className="w-250 h-250 object-cover mb-4" src={photo} alt={prompt} />
      <div className="w-full h-16 p-2 capitalize text-2xl font-bold text-black flex items-center justify-center">
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
      {user.email === "admin@mail.com" && (
        <button className="text-black" onClick={handleClick}>
          Delete Post
        </button>
      )}
    </div>
  );
};
export default AiCard;
