import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";
import Masonry from "react-responsive-masonry";
import { Fade } from "react-awesome-reveal";
import { ClipLoader, PacmanLoader, BeatLoader } from "react-spinners";
import { BsSearchHeartFill } from "react-icons/bs";
import Hero from "./Hero";

const Home = () => {
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
  const {
    characters,
    searchTerm,
    setSearchTerm,
    isPending,
    error,
    filteredCharacters,
    loading,
    setLoading,
  } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=151");

  console.log(filteredCharacters);

  return (
    <>
      {/* <Hero /> */}
      <div className="max-w-7xl mx-auto mt-56 sm:mt-24">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <h1 className="font-bold text-xl mr-3">Catching Pokemon </h1>
            <BeatLoader color="black" loading={loading} size={25} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="mb-20 relative">
              <input
                type=""
                placeholder="PokeSearch"
                className="mt-8 font-medium bg-slate-100 px-4 py-2 text-2xl rounded-3xl mb-8 text-black w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <BsSearchHeartFill className="absolute right-4 top-12 text-slate-400" />
            </div>

            <div>
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8">
                {filteredCharacters.map((char) => {
                  return (
                    // <Fade>
                    <Link to={`/poke/${char.id}`}>
                      <div
                        className="rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col justify-center items-center relative bg-white"
                        key={char.id}
                      >
                        <h2 className="w-full h-16 p-2 capitalize text-lg text-black flex items-center justify-center">
                          #{char.id}
                        </h2>
                        <div className="h-250 w-auto object-cover mb-4">
                          <img
                            className="h-250 w-auto object-cover mb-4 saturate-[0.8]"
                            src={char.sprites.other.home.front_default}
                            // src={char.sprites.other.dream_world.front_default}
                            // src={char.sprites.front_default}
                            alt={char.name}
                          />
                        </div>

                        <div className="w-full h-16 p-2 capitalize text-2xl font-bold text-black flex items-center justify-center">
                          {char.name}
                        </div>
                        <div className="flex justify-center items-center gap-4">
                          {char.types.map((poke) => {
                            return (
                              <div
                                className={`flex justify-center items-center px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl mb-8 ${
                                  colours[poke.type.name.toLowerCase()]
                                }`}
                              >
                                {poke.type.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Link>
                    // </Fade>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
