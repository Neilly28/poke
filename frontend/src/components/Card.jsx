import { useState } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { colours } from "../constants/colours";

const Card = ({ _id, name, prompt, photo, type }) => {
  const { deletePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = async () => {
    if (!user || user.email !== "admin@mail.com") {
      return;
    }
    const response = await fetch(
      "https://cute-erin-codfish-sari.cyclic.app/api/v1/post/" + _id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      deletePost(_id);
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return null; // Don't render anything if card has been deleted
  }

  return (
    <div
      className={
        "rounded-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col justify-center items-center relative bg-white h-[600px]"
      }
    >
      <img
        className="object-cover max-h-[300px] mb-4"
        src={photo}
        alt={prompt}
      />

      <div className="flex flex-col items-center justify-evenly">
        <div className="w-full h-16 p-2 capitalize text-2xl font-bold text-black text-center">
          {name}
        </div>

        {type ? (
          <div
            className={`px-4 py-2 capitalize text-sm font-bold text-white rounded-3xl mb-8 ${
              colours[type.toLowerCase()]
            }`}
          >
            {type}
          </div>
        ) : (
          <div
            className={
              "p-2 capitalize text-sm font-bold text-white rounded-3xl"
            }
          >
            <p>Normal</p>
          </div>
        )}

        <div className="p-4 capitalize text-sm text-black tracking-wide flex items-center justify-center">
          {prompt}
        </div>
      </div>
      {user?.email === "admin@mail.com" && (
        <button
          onClick={handleClick}
          className="absolute top-5 right-5 w-8 h-8 "
        >
          <BsFillXCircleFill className="w-full h-full text-gray-200 hover:text-red-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300" />
        </button>
      )}
    </div>
  );
};
export default Card;
