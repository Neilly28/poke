import { useState, useEffect } from "react";
import AiCard from "../components/AiCard";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  RingLoader,
  ClipLoader,
  PacmanLoader,
  BeatLoader,
} from "react-spinners";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <AiCard key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Community = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mt-24 mb-24">
        <h1 className="text-center text-2xl font-bold mb-12 px-4 py-2 rounded-3xl mb-12 bg-[#f7da34] cursor-pointer mt-6 text-black w-1/2 mx-auto cursor-default w-1/3">
          The Pokemon Community
        </h1>
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <h1 className="font-bold text-xl mr-3">Catching Pokemon </h1>
            <BeatLoader color="black" loading={loading} size={25} />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-xl mb-3">
                Showing results for <span className="">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-8">
              {searchText ? (
                <RenderCards data={[]} title="no search results found" />
              ) : (
                <RenderCards data={allPosts} title="no posts fgound" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Community;
