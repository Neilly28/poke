import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TypeWriterEffect from "react-typewriter-effect";
import { ClipLoader, PacmanLoader, BeatLoader } from "react-spinners";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiArrowGoBackFill } from "react-icons/ri";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokeDetails, setPokeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [evo, setEvo] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handlePrevClick = () => {
    const prevId = parseInt(id) - 1;
    if (id == 1) {
      navigate(`/poke/151`);
    } else {
      navigate(`/poke/${prevId}`);
    }

    console.log("previous clicked!");
  };

  const handleNextClick = () => {
    const nextId = parseInt(id) + 1;
    if (id == 151) {
      navigate(`/poke/1`);
    } else {
      navigate(`/poke/${nextId}`);
    }
  };

  // make this a CONSTANT file
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
        <Link to="/" className="flex justify-center items-center mt-24 mx-auto">
          <div className="text-slate-600 w-6 h-6">
            <RiArrowGoBackFill className="w-full h-full" />
          </div>
          <h2 className="px-4 py-2 text-2xl text-slate-600">
            Back to Homepage
          </h2>
        </Link>
      )}

      <div className="flex items-center mx-auto max-w-full p-4 sm:p-16">
        <button onClick={handlePrevClick} class="w-24 h-24">
          <SlArrowLeft class="w-full h-full text-gray-200 hover:text-yellow-500" />
        </button>

        {/* {error && <div>{error}</div>} */}
        {isPending && (
          <div className="flex items-center justify-center h-screen mx-auto">
            <h1 className="font-bold text-xl mr-3">Catching Pokemon </h1>
            <BeatLoader color="black" loading={isPending} size={25} />
          </div>
        )}

        {pokeDetails && text && (
          <div className="flex-col sm:grid sm:grid-cols-3 mt-20 mx-auto max-w-6xl mb-20 rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-8 justify-center items-center relative bg-white">
            <div
              className="flex flex-col justify-center items-center p-4"
              // key={char.id}
            >
              <div className="w-full h-16 p-2 capitalize text-lg text-black flex items-center justify-center">
                #{pokeDetails.id}
              </div>
              <div className="h-250 w-auto object-cover mb-4">
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
              <div className="w-full h-16 p-2 capitalize text-2xl font-bold text-black flex items-center justify-center">
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
            <div className="mt-16 sm:mt-0 max-w-md text-black">{text}</div>
          </div>
        )}
        <button onClick={handleNextClick} class="w-24 h-24">
          <SlArrowRight class="w-full h-full text-gray-200 hover:text-[#f7da34]" />
        </button>
      </div>
    </>
  );
};

export default PokemonDetails;

// && (
//   <>
//     <TypeWriterEffect
//       startDelay={100}
//       cursorColor="black"
//       text={text}
//       typeSpeed={30}
//       textStyle={{
//         fontFamily: "Poppins",
//         fontWeight: 400,
//         fontSize: "1em",
//       }}
//     />
//   </>
// )
