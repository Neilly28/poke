import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BeatLoader } from "react-spinners";
import Card from "../components/Card";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Community = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://cute-erin-codfish-sari.cyclic.app/api/v1/post",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto mt-48 mb-96">
      <div className="mb-24">
        <h1 className="text-center text-2xl font-bold mb-4 md:mb-12 px-4 py-2 rounded-3xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mt-6 text-white mx-auto cursor-default w-full md:w-1/2 max-w-sm">
          The PokéAI Community
        </h1>
      </div>
      <div className="mt-10">
        {loading && (
          <div className="flex items-center justify-center h-screen">
            <h1 className="font-bold text-xl mr-3">
              Hang tight! Spinning up servers
            </h1>
            <BeatLoader color="black" loading={loading} size={25} />
          </div>
        )}
        {!error && (
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8">
            <RenderCards data={allPosts} />
          </div>
        )}
        {error && (
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8">
            "Oops, something went wrong 😭 "
          </div>
        )}
      </div>
    </section>
  );
};

export default Community;
