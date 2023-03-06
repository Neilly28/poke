import React, { useState } from "react";
// import * as React from "react";
import CreatePokemon from "../components/CreatePokemon";

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
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create your Pokemon!
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form
        className="flex flex-col justify-center items-center mt-20 mx-auto justify-center max-w-5xl mb-20 rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-8  relative bg-white"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center text-black gap-8">
          <div className="flex flex-col justify-center items-start gap-4">
            <label htmlFor="">Name</label>
            <input
              class="form-input px-4 py-3 rounded-full w-full"
              label="Your Name"
              type="text"
              name="name"
              placeholder="Hackermon"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <label htmlFor="">Type</label>
            <select
              label="Type"
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="flex justify-center items-center px-4 py-3 pr-9 rounded-full w-full"
            >
              <option value="">Select</option>
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
        </div>

        <button type="button" onClick={handleSurpriseMe} className="text-xs">
          Surprise Me
        </button>

        <label htmlFor="">Describe your Pokemon in a few words</label>
        <input
          className="form-input px-4 py-3 rounded-full w-full"
          label="Prompt"
          type="text"
          name="prompt"
          placeholder="A Pokemon with the power to hack all servers and will never get an error"
          value={form.prompt}
          onChange={handleChange}
        />

        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
          {form.photo ? (
            <img
              src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJGo_BDmE1BQXej-UemTXxZG6RkDsA95ZnA&usqp=CAU"
              alt="preview"
              // className="w-9/12 h-9/12 object-contain opacity-40"
            />
          )}

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              'hello loader'
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-5">
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
    </section>
  );
};

export default CreatePost;
