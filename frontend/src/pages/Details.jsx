import React, { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiArrowGoBackFill } from "react-icons/ri";
import { colours } from "../constants/colours";
import { PokemonContext } from "../context/PokemonContext";

const Details = () => {
  const { pokemon, isPending } = useContext(PokemonContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedPokemon = pokemon.filter((poke) => poke.id == id);
  console.log({ pokemon });

  const handlePrevClick = () => {
    const prevId = parseInt(id) - 1;
    navigate(`/pokemon/${prevId}`);
  };

  const handleNextClick = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/pokemon/${nextId}`);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="font-bold text-xl mr-3">Catching Pokémon </h1>
        <BeatLoader color="black" loading={isPending} size={25} />
      </div>
    );
  }

  return (
    <>
      (
      <Link
        key={id}
        to="/home"
        className="flex justify-center items-center mt-24 mx-auto"
      >
        <div className="text-slate-600 w-6 h-6">
          <RiArrowGoBackFill className="w-full h-full" />
        </div>
        <h2 className="px-4 py-2 text-2xl text-slate-600">Back to Homepage</h2>
      </Link>
      )
      <div className="flex items-center mx-auto max-w-full p-4 sm:p-16">
        {id > 1 && (
          <button onClick={handlePrevClick} className="w-24 h-24">
            <SlArrowLeft className="w-full h-full text-gray-200 hover:text-yellow-500" />
          </button>
        )}

        {selectedPokemon.map((poke) => {
          const { id, name, image, text, types, stats } = poke;
          return (
            <div
              key={id}
              className="flex-col sm:grid sm:grid-cols-3 mt-12 mx-auto max-w-6xl mb-20 rounded-lg text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-8 justify-center items-center relative bg-white"
            >
              <div className="flex flex-col justify-center items-center p-4">
                <div className="w-full capitalize text-lg text-black flex items-center justify-center">
                  #{id}
                </div>
                <div className="h-250 w-auto object-cover sm:mb-4">
                  {
                    <img
                      className="h-250 w-auto object-cover mb-4 saturate-[0.8]"
                      src={image}
                    />
                  }
                </div>
                <div className="w-full mb-4 capitalize text-2xl font-bold text-black flex items-center justify-center">
                  {name}
                </div>
                <div className="flex justify-center items-center gap-4">
                  {types.map((type, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`flex justify-center items-center px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl mb-8 ${
                          colours[type.toLowerCase()]
                        }`}
                      >
                        {type}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex sm:flex-col justify-around items-center text-black">
                {stats.slice(0, 3).map((stat) => {
                  return (
                    <div className="flex flex-col items-center text-center mb-3">
                      <div className="capitalize mb-3 font-medium order-last">
                        {stat.name}
                      </div>
                      <div className="capitalize font-bold text-xl">
                        {stat.value}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 sm:mt-0 max-w-md text-black">
                {text.replace("", "")}
              </div>
            </div>
          );
        })}

        {id < 905 && (
          <button onClick={handleNextClick} className="w-24 h-24">
            <SlArrowRight className="w-full h-full text-gray-200 hover:text-[#f7da34]" />
          </button>
        )}
      </div>
    </>
  );
};

export default Details;
