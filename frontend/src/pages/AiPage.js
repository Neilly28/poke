import React, { useState } from "react";
import AiGenerate from "../components/AiGenerate";
import {
  RingLoader,
  ClipLoader,
  PacmanLoader,
  BeatLoader,
} from "react-spinners";
import { BsDice5Fill, BsFillShareFill } from "react-icons/bs";
// import { ReactComponent as YourSvg } from "../assets/logo.svg";
import Icon from "../assets/Logo";

const CreatePost = () => {
  const {
    handleSubmit,
    form,
    handleChange,
    handleSurpriseMe,
    generatingImg,
    loading,
    generateImage,
  } = AiGenerate();

  const [pokemonType, setPokemonType] = useState("");

  return (
    <>
      <section className="mt-20 mx-auto max-w-5xl mb-20 rounded-lg text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-8 relative bg-white">
        <div className="flex flex-col justify-center items-center mb-12">
          <h1 className="text-center text-2xl font-bold mb-4 px-4 py-2 rounded-3xl bg-[#f7da34] mt-6 text-black mx-auto cursor-default w-1/3">
            Create a Pokemon
          </h1>
          <Icon />
        </div>

        <div className="flex justify-evenly items-center">
          <form onSubmit={handleSubmit} className="w-1/2">
            <div className="flex flex-col justify-center items-start gap-4 text-black w-1/2 mb-12">
              <label htmlFor="" className="text-sm text-gray-500 w-full block">
                Pokemon Type
              </label>

              <select
                label="Type"
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`w-full rounded-lg text-sm p-2 dark:text-gray-400 border border-gray-400 cursor-pointer`}
              >
                <option value="">Please select</option>
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="electric">electric</option>
                <option value="grass">grass</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dragon">dragon</option>
                <option value="dark">dark</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
            </div>

            <div class="relative z-0 w-full mb-12 group">
              <input
                type="text"
                name="name"
                id="name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={form.name}
                onChange={handleChange}
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Pokemon Name
              </label>
            </div>

            <div class="relative z-0 w-full mb-6 group">
              <textarea
                name="prompt"
                id="prompt"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-y min-h-24"
                placeholder=" "
                required
                value={form.prompt}
                onChange={handleChange}
              ></textarea>
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Pokemon Description
              </label>
              <button
                type="button"
                onClick={handleSurpriseMe}
                class="px-4 py-2 text-xs rounded-3xl mb-8 bg-[#F7D02C] hover:bg-yellow-500 cursor-pointer mt-6"
              >
                <div className="flex justify-center items-center gap-2">
                  <BsDice5Fill />
                  Surprise Me
                </div>
              </button>
            </div>

            <div className="mt-10 flex gap-5">
              {form.type && form.name && form.prompt ? (
                <button
                  type="submit"
                  onClick={generateImage}
                  className="px-4 py-2 capitalize text-lg font-bold text-white rounded-3xl mb-8 bg-blue-500 hover:bg-blue-800 cursor-pointer mt-6"
                >
                  {generatingImg ? "Generating..." : "Generate"}
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={generateImage}
                  className="px-4 py-2 capitalize text-lg font-bold text-white rounded-3xl mb-8 bg-gray-400 mt-6"
                >
                  {generatingImg ? "Generating..." : "Generate"}
                </button>
              )}

              {form.photo && (
                <button
                  type="submit"
                  className="px-4 py-2 capitalize text-lg font-bold text-white rounded-3xl mb-8 bg-blue-500 hover:bg-blue-800 cursor-pointer mt-6"
                >
                  <div className="flex justify-center items-center gap-2">
                    <BsFillShareFill />
                    {loading ? "Sharing..." : "Share"}
                  </div>
                </button>
              )}
            </div>
          </form>

          <div className="relative focus:ring-blue-500 focus:border-blue-500 flex justify-center items-center max-w-5xl">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-250 h-250 object-contain border border-black rounded-lg"
              />
            ) : (
              <div className="bg-[rgba(0,0,0,0.5)] inset-0 rounded-lg">
                <img
                  src="https://i.pinimg.com/474x/1e/60/87/1e6087cf114c7ced058e98dc1124634d.jpg"
                  alt="preview"
                  className="w-250 h-250 object-contain opacity-90"
                />
              </div>
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <RingLoader
                  color="#f7da34"
                  loading={generatingImg}
                  size={100}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;