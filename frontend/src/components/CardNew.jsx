import React from "react";

// import { download } from "../assets";
// import { downloadImage } from "../utils";

const CardNew = ({ _id, name, prompt, photo, type }) => (
  <div className="rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col justify-center items-center relative bg-white">
    <div className="w-full h-16 p-2 capitalize text-lg font-bold text-black flex items-center justify-center">
      {name}
    </div>

    <img className="w-full h-full mb-4" src={photo} alt={prompt} />

    <div className="p-2 capitalize text-sm font-bold text-white bg-amber-600 rounded-3xl">
      {type}
    </div>
    <div className="w-full h-16 p-4 capitalize text-md font-bold text-black flex items-center justify-center">
      {prompt}
    </div>
  </div>
);

export default CardNew;

{
  /* <div className="bg-black text-yellow-400 border border-black p-2">
<h2 className="capitalize"> {poke.type.name} </h2>
</div> */
}
