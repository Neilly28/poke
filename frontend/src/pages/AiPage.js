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
  const [allow, setAllow] = useState("");

  return (
    <>
      <section className="mt-24 mx-auto max-w-5xl mb-20 rounded-lg text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-8 relative bg-white">
        <div className="flex flex-col justify-center items-center mb-12">
          <h1 class="text-center text-2xl font-bold mb-4 px-4 py-2 rounded-3xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mt-6 text-white mx-auto cursor-default w-full md:w-1/2 max-w-sm">
            Create a Pokémon
          </h1>

          <div className="flex justify-center items-center gap-2">
            <h2 className="text-xs text-slate-500">Powered by</h2>
            <Icon />
          </div>
        </div>

        <div className="flex justify-evenly items-center flex-col sm:flex-row">
          <form onSubmit={handleSubmit} className="w-full sm:w-1/2">
            <div className="flex flex-col justify-center items-start gap-4 text-black w-1/2 mb-12">
              <label htmlFor="" className="text-sm text-gray-500 w-full block">
                Pokémon Type
              </label>

              <select
                label="Type"
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`w-full rounded-lg text-sm p-2 text-gray-400 border border-gray-400 cursor-pointer ${
                  form.photo && "bg-gray-300"
                }`}
                disabled={form.photo ? true : false}
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

            <div class="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                id="name"
                class={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  form.photo && "bg-gray-300"
                }`}
                placeholder=" "
                required
                value={form.name}
                onChange={handleChange}
                disabled={form.photo ? true : false}
              />
              <label
                for="floating_email"
                class={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  form.photo && "hidden"
                }`}
              >
                Pokémon Name
              </label>
            </div>

            <div class="relative z-0 w-full mb-6 mt-12 group">
              <textarea
                name="prompt"
                id="prompt"
                rows="3"
                class={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-y min-h-48 ${
                  form.photo && "bg-gray-300"
                }`}
                placeholder=" "
                required
                value={form.prompt}
                onChange={handleChange}
                disabled={form.photo ? true : false}
              ></textarea>
              <label
                for="floating_password"
                class={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  form.photo && "hidden"
                }`}
              >
                Pokémon Description
              </label>
              {!form.photo && (
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  disabled={form.photo}
                  class={`px-4 py-2 text-xs rounded-3xl mb-8 bg-[#F7D02C] cursor-pointer mt-6 ${
                    form.photo
                      ? "bg-gray-500"
                      : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                >
                  <div className="flex justify-center items-center gap-2">
                    <BsDice5Fill />
                    Surprise Me
                  </div>
                </button>
              )}
            </div>

            <div className="flex gap-5">
              <button
                type="submit"
                onClick={generateImage}
                disabled={
                  !form.name || !form.prompt || !form.type || form.photo
                }
                className={`px-4 py-2 capitalize text-lg font-bold text-white rounded-3xl mb-8 cursor-pointer mt-6 ${
                  !form.name || !form.prompt || !form.type || form.photo
                    ? "bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-800"
                }`}
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
              <button
                type="submit"
                disabled={!form.photo}
                className={`px-4 py-2 capitalize text-lg font-bold text-white rounded-3xl mb-8 bg-blue-500 cursor-pointer mt-6 ${
                  !form.photo ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-800"
                }`}
              >
                <div className="flex justify-center items-center gap-2">
                  <BsFillShareFill />
                  {loading ? "Sharing..." : "Share"}
                </div>
              </button>
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
