import React from "react";
import { usePokemonsContext } from "../hooks/usePokemonsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const PokeCard = ({ _id, name, prompt, photo, type }) => {
  const { dispatch } = usePokemonsContext();
  const { user } = useAuthContext();

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/v1/post" + _id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POKEMON", payload: json });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-3 mt-20 mx-auto justify-center max-w-5xl mb-20">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold text-lg capitalize">#9999</div>
          <img className="w-32 p-4" src={photo} alt="" />
          <div className="font-bold text-lg capitalize mb-4">{name}</div>

          <div className="flex gap-4">
            <div className="bg-black text-yellow-400 border border-black p-2">
              <h2 className="capitalize"> {type} </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="capitalize mb-3">stats go herer</div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-bold">Abilities</h2>
          </div>
          <h2 className="capitalize bg-black text-yellow-400 border border-black p-2 w-1/2">
            abilities go here
          </h2>
        </div>
      </div>
      <h1> {prompt} </h1>
      <button onClick={handleClick}>Delte Pokemon</button>
    </div>
  );
};

export default PokeCard;
