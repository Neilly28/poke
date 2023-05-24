import AiGenerate from "../components/AiGenerate";
import { RingLoader } from "react-spinners";
import { BsDice5Fill, BsFillShareFill } from "react-icons/bs";
import Icon from "../assets/Logo";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { colours } from "../constants/colours";
import ditto from "../assets/ditto.gif";

const Create = () => {
  const { user } = useContext(AuthContext);
  const keys = Object.keys(colours);

  const {
    handleSubmit,
    form,
    handleChange,
    handleSurpriseMe,
    generatingImg,
    loading,
    generateImage,
  } = AiGenerate();

  return (
    <>
      <section className="mt-24 mx-auto max-w-5xl rounded-lg text-black shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-8 relative bg-white mb-96">
        <div className="flex flex-col justify-center items-center mb-12">
          <h1 className="text-center text-2xl font-bold mb-4 px-4 py-2 rounded-3xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mt-6 text-white mx-auto cursor-default w-full md:w-1/2 max-w-sm">
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
                <option value="">Choose a type</option>
                {keys.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </div>

            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                id="name"
                className={`block py-2.5 px-0 w-full/2 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  form.photo && "bg-gray-300"
                }`}
                placeholder=" "
                required
                value={form.name}
                onChange={handleChange}
                disabled={form.photo ? true : false}
                maxLength={12}
              />
              <label
                htmlFor="floating_email"
                className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  form.photo && "hidden"
                }`}
              >
                Pokémon Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 mt-12 group">
              <textarea
                name="prompt"
                id="prompt"
                rows="2"
                className={`block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-y min-h-48 ${
                  form.photo && "bg-gray-300"
                }`}
                required
                value={form.prompt}
                onChange={handleChange}
                disabled={form.photo ? true : false}
                maxLength={180}
              ></textarea>
              <label
                htmlFor="floating_password"
                className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
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
                  className={`px-4 py-2 text-xs rounded-3xl mb-8 bg-[#F7D02C] cursor-pointer mt-6 ${
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
              {user && (
                <button
                  type="submit"
                  disabled={!form.photo}
                  className={`px-4 py-2 capitalize text-lg font-bold text-white rounded-3xl mb-8 bg-blue-500 cursor-pointer mt-6 ${
                    !form.photo
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-800"
                  }`}
                >
                  <div className="flex justify-center items-center gap-2">
                    <BsFillShareFill />
                    {loading ? "Sharing..." : "Share"}
                  </div>
                </button>
              )}
              {!user && (
                <button
                  type="submit"
                  disabled={!form.photo}
                  className={`px-4 py-2 capitalize text-lg font-bold text-white rounded-3xl mb-8 bg-blue-500 cursor-pointer mt-6 ${
                    !form.photo
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-800"
                  }`}
                >
                  <div className="flex justify-center items-center gap-2">
                    <Link to="/login">
                      {/* <BsFillShareFill /> */}
                      Login to Share
                    </Link>
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
              <div>
                <img
                  src={ditto}
                  alt="preview"
                  className="w-250 h-250 object-contain opacity-90"
                />
              </div>
            )}
            {generatingImg && (
              <div className="absolute">
                <RingLoader loading={generatingImg} size={100} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Create;
