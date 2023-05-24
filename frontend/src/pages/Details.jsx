import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiArrowGoBackFill } from "react-icons/ri";
import { colours } from "../constants/colours";

const Details = () => {
  const { id } = useParams();
  const [pokeDetails, setPokeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handlePrevClick = () => {
    const prevId = parseInt(id) - 1;
    if (id == 1) {
      navigate(`/pokemon/151`);
    } else {
      navigate(`/pokemon/${prevId}`);
    }
  };

  const handleNextClick = () => {
    const nextId = parseInt(id) + 1;
    if (id == 151) {
      navigate(`/pokemon/1`);
    } else {
      navigate(`/pokemon/${nextId}`);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [response, text] = await Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);

        setPokeDetails(response.data);

        const rng = Math.floor(
          Math.random() * text.data.flavor_text_entries.length - 1
        );
        setText(text.data.flavor_text_entries[rng].flavor_text);

        setIsPending(false);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchDetails();
  }, [id, text]);

  return (
    <>
      {pokeDetails && text && (
        <Link
          key={id}
          to="/home"
          className="flex justify-center items-center mt-24 mx-auto"
        >
          <div className="text-slate-600 w-6 h-6">
            <RiArrowGoBackFill className="w-full h-full" />
          </div>
          <h2 className="px-4 py-2 text-2xl text-slate-600">
            Back to Homepage
          </h2>
        </Link>
      )}

      <div className="flex items-center mx-auto max-w-full p-4 sm:p-16">
        <button onClick={handlePrevClick} className="w-24 h-24">
          <SlArrowLeft className="w-full h-full text-gray-200 hover:text-yellow-500" />
        </button>

        {/* {error && <div>{error}</div>} */}
        {isPending && (
          <div className="flex items-center justify-center h-screen mx-auto">
            <h1 className="font-bold text-xl mr-3">Catching Pokémon </h1>
            <BeatLoader color="black" loading={isPending} size={25} />
          </div>
        )}

        {pokeDetails && text && (
          <div className="flex-col sm:grid sm:grid-cols-3 mt-12 mx-auto max-w-6xl mb-20 rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-8 justify-center items-center relative bg-white">
            <div
              className="flex flex-col justify-center items-center p-4"
              // key={char.id}
            >
              <div className="w-full capitalize text-lg text-black flex items-center justify-center">
                #{pokeDetails.id}
              </div>
              <div className="h-250 w-auto object-cover sm:mb-4">
                {
                  <img
                    className="h-250 w-auto object-cover mb-4 saturate-[0.8]"
                    src={pokeDetails.sprites.other.home.front_default}
                    // src={pokeDetails.sprites.other.dream_world.front_default}
                    // src={pokeDetails.sprites.front_default}
                    alt={pokeDetails.name}
                  />
                }
              </div>
              <div className="w-full mb-4 capitalize text-2xl font-bold text-black flex items-center justify-center">
                {pokeDetails.name}
              </div>
              <div className="flex justify-center items-center gap-4">
                {pokeDetails.types.map((poke) => {
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
            <div className="flex sm:flex-col justify-around items-center text-black">
              {pokeDetails.stats.slice(0, 3).map((poke) => {
                return (
                  <div className="flex flex-col items-center text-center mb-3">
                    <div className="capitalize mb-3 font-medium order-last">
                      {poke.stat.name}
                    </div>
                    <div className="capitalize font-bold text-xl">
                      {poke.base_stat}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 sm:mt-0 max-w-md text-black">{text}</div>
          </div>
        )}
        <button onClick={handleNextClick} className="w-24 h-24">
          <SlArrowRight className="w-full h-full text-gray-200 hover:text-[#f7da34]" />
        </button>
      </div>
    </>
  );
};

export default Details;
