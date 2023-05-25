import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { BsSearchHeartFill } from "react-icons/bs";
import { colours, shadows } from "../constants/colours";
import { useContext, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";

const Home = () => {
  const { searchTerm, setSearchTerm, filteredPokemon, loading, handleLimit } =
    useContext(PokemonContext);

  console.log({ filteredPokemon });

  // end state
  const [end, setEnd] = useState(151);

  // handeClick
  const handleClick = () => {
    setEnd(end + 151);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-48 mb-24">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <h1 className="font-bold text-xl mr-3">Catching Pokémon </h1>
            <BeatLoader color="black" loading={loading} size={25} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="mb-20 relative">
              <input
                type=""
                placeholder="PokéSearch"
                className="mt-8 font-medium bg-slate-100 px-4 py-2 text-2xl rounded-3xl mb-8 text-black w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <BsSearchHeartFill className="absolute right-4 top-12 text-slate-400" />
            </div>

            <div>
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8">
                {filteredPokemon.slice(0, end).map((poke) => {
                  const { id, name, image, types } = poke;
                  return (
                    <div
                      key={id}
                      className={`rounded-lg text-white shadow-lg hover:shadow-md hover:shadow-[#F7D02C] transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col justify-center items-center relative`}
                    >
                      <Link to={`/pokemon/${id}`}>
                        <h2 className="w-full h-16 p-2 capitalize text-lg text-black flex items-center justify-center">
                          #{id}
                        </h2>
                        <div className="h-250 w-auto object-cover mb-4">
                          <img
                            className="h-250 w-auto object-cover mb-4 saturate-[0.8]"
                            src={image}
                            alt={name}
                          />
                        </div>

                        <div className="w-full h-16 p-2 capitalize text-2xl font-bold text-black flex items-center justify-center">
                          {name}
                        </div>
                        <div className="flex justify-center items-center gap-4">
                          {types.map((poke, idx) => {
                            return (
                              <div
                                key={idx}
                                className={`flex justify-center items-center px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl mb-8 ${
                                  colours[poke.toLowerCase()]
                                }`}
                              >
                                {poke}
                              </div>
                            );
                          })}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-20 relative">
              {end < 905 && (
                <button
                  onClick={handleClick}
                  className="mt-24 transition-all ease-in font-medium bg-red-400 hover:bg-red-500 px-4 py-2 text-2xl rounded-3xl mb-8 text-white w-96"
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
