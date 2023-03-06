import React, { useState } from "react";
// import * as React from "react";
import CreatePokemon from "../components/CreatePokemon";
import {
  RingLoader,
  ClipLoader,
  PacmanLoader,
  BeatLoader,
} from "react-spinners";

const CreatePost = () => {
  const {
    handleSubmit,
    form,
    handleChange,
    handleSurpriseMe,
    generatingImg,
    loading,
    generateImage,
  } = CreatePokemon();

  const [pokemonType, setPokemonType] = useState("");

  return (
    <section className="flex justify-evenly items-center mt-20 mx-auto max-w-5xl mb-20 rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-8 relative bg-white">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start items-center text-black gap-8">
          <div className="relative">
            <input
              class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
              label="Your Name"
              // type="text"
              name="name"
              placeholder="Hackermon"
              value={form.name}
              onChange={handleChange}
            />
            <label
              htmlFor=""
              class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Pokemon Name
            </label>
          </div>
        </div>

        <button type="button" onClick={handleSurpriseMe} className="text-xs">
          Surprise Me
        </button>

        <div class="mt-10 relative">
          <input
            class="peer h-10 w-96 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
            label="Prompt"
            // type="text"
            name="prompt"
            placeholder="A Pokemon with the power to hack all servers and will never get an error"
            value={form.prompt}
            onChange={handleChange}
          />
          <label
            htmlFor=""
            class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            Pokemon Description
          </label>
        </div>

        <div className="flex flex-col justify-center items-start gap-4 text-black mt-10">
          {/* <label htmlFor="">Type</label> */}
          <select
            label="Type"
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="flex justify-center items-center px-4 py-3 pr-9 w-full"
          >
            <option value="">Select Type</option>
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

        <div className="mt-10 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          {form.photo && (
            <button
              type="submit"
              className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "Sharing..." : "Share"}
            </button>
          )}
        </div>
      </form>

      <div className="relative focus:ring-blue-500 focus:border-blue-500 flex justify-center items-center max-w-5xl">
        {form.photo ? (
          <img
            src={form.photo}
            alt={form.prompt}
            className="w-250 h-250 object-contain"
          />
        ) : (
          <div className="bg-[rgba(0,0,0,0.5)] inset-0">
            <img
              src="https://i.pinimg.com/474x/1e/60/87/1e6087cf114c7ced058e98dc1124634d.jpg"
              alt="preview"
              className="w-250 h-250 object-contain opacity-90"
            />
          </div>
        )}

        {generatingImg && (
          <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
            <RingLoader color="#f7da34" loading={generatingImg} size={100} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatePost;
